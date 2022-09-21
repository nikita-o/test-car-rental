import { ConflictException, Get, Injectable, Post } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { DateTime } from 'luxon';
import { RentDto } from './dto/rent.dto';
import { ConfigService } from '@nestjs/config';
import { ReportDto } from './dto/report.dto';

@Injectable()
export class RentService {
  constructor(
    private db: DatabaseService,
    private config: ConfigService,
  ) {}

  async checkCar(idCar: number): Promise<boolean> {
    const { rows } = await this.db.query(
      'SELECT end_date FROM car_rentals WHERE car_id = $1 ORDER BY end_date DESC LIMIT 1',
      [String(idCar)],
    );

    const end_date: DateTime = DateTime.fromISO(rows[0].end_date)
    const { days } = end_date.diffNow('day').toObject()

    return Number(days) > 3

  }

  cost(days: number): number {
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
    if (rent.startDate.getDay() > 5) {
      throw new ConflictException('Начало аренды в выходной!');
    }
    if (rent.endDate.getDay() > 5) {
      throw new ConflictException('Окончание аренды в выходной!');
    }

    await this.db.query(
      'INSERT INTO car_rentals (car_id, client_id, start_date, end_date) VALUES ($1, $2, $3, $4)',
      [rent.idCar, rent.idClient, rent.startDate, rent.endDate],
    );
  }

  async averageLoadReport(): Promise<ReportDto> {
    const { rows } = await this.db.query(
      'SELECT car_id, COUNT(*) AS rentCount FROM car_rentals GROUP BY car_id',
    );
    return <ReportDto><unknown>rows;
  }
}
