import { ConflictException, Get, Injectable, Logger, Post } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { DateTime } from 'luxon';
import { RentDto } from './dto/rent.dto';
import { ConfigService } from '@nestjs/config';
import { ReportCar, ReportDto } from './dto/report.dto';

@Injectable()
export class RentService {
  private readonly logger = new Logger(RentService.name);

  constructor(
    private db: DatabaseService,
    private config: ConfigService,
  ) {}

  async checkCar(idCar: number): Promise<boolean> {
    const { rows, rowCount } = await this.db.query(
      'SELECT end_date FROM car_rentals WHERE car_id = $1 ORDER BY end_date DESC LIMIT 1',
      [String(idCar)],
    );

    // Если машина не найдена среди арендованных, значит она свободна
    if (!rowCount) {
      return true;
    }

    const end_date: DateTime = DateTime.fromISO(rows[0].end_date)
    const { days } = end_date.diffNow('days').toObject()

    return Number(days) > 3
  }

  cost(days: number): number {
    if (days > 30) {
      throw new ConflictException('Аренда более чем на 30 дней!');
    }

    const defPrice: number = this.config.getOrThrow('rentPrice');
    if (days > 18) {
      days -= 15;
      return defPrice * 4 +
        (defPrice - defPrice * 0.05) * 5 +
        (defPrice - defPrice * 0.10) * 6 +
        (defPrice - defPrice * 0.15) * days;
    }
    if (days > 10) {
      days -= 9;
      return defPrice * 4 +
        (defPrice - defPrice * 0.05) * 5 +
        (defPrice - defPrice * 0.10) * days;
    }
    if (days > 5) {
      days -= 4;
      return defPrice * 4 +
        (defPrice - defPrice * 0.05) * days;
    }
    return defPrice * days;
  }

  async rentCar(rent: RentDto): Promise<void> {
    const start_date: DateTime = DateTime.fromISO(rent.startDate);
    const end_date: DateTime = DateTime.fromISO(rent.endDate);

    if (start_date.toLocal().weekday > 5) {
      throw new ConflictException('Начало аренды в выходной!');
    }
    if (end_date.toLocal().weekday > 5) {
      throw new ConflictException('Окончание аренды в выходной!');
    }
    const { days } = end_date.diff(start_date, 'days').toObject();
    if (Number(days) > 30) {
      throw new ConflictException('Аренда более чем на 30 дней!');
    }

    await this.db.query(
      'INSERT INTO car_rentals (car_id, client_id, start_date, end_date) VALUES ($1, $2, $3, $4)',
      [rent.idCar, rent.idClient, rent.startDate, rent.endDate],
    );
  }

  async averageLoadReport(): Promise<ReportDto> {
    let { rows } = await this.db.query(
      "SELECT * FROM car_rentals WHERE start_date >  CURRENT_DATE - 30",
    );

    const workload: any = {};
    for (const row of rows) {
      const start_date: DateTime = DateTime.fromJSDate(row.start_date);
      const end_date: DateTime = DateTime.fromJSDate(row.end_date);

      const { days } = end_date.diff(start_date, 'days').toObject();
      if (!workload[row.car_id]) {
        workload[row.car_id] = 0;
      }
      workload[row.car_id] += Number(days);
    }

    const report: ReportCar[] = [];
    for (const reportKey in workload) {
      report.push({
        carId: +reportKey,
        percentWorkload: workload[reportKey] / 30,
      });
    }

    return <ReportDto>{ report };
  }
}
