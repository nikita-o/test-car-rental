import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { CarRentalsInterface } from '../entities/car-rentals.interface';

@Injectable()
export class CarRentalsRepository {
  private readonly tableName = 'car_rentals';
  constructor(private db: DatabaseService) {}

  async create(entity: Partial<CarRentalsInterface>): Promise<void> {
    await this.db.query(
      `INSERT INTO car_rentals (car_id, client_id, start_date, end_date) VALUES ($1, $2, $3, $4)`,
      [...Object.values(entity)],
    );
  }

  read(id: number): Promise<CarRentalsInterface> {
    return this.db.queryOneRow(
      `SELECT * FROM car_rentals WHERE id=$1`,
      [id],
    );
  }

  async update(id: number, values: Partial<CarRentalsInterface>): Promise<void> {
    const set = [];
    let i = 1;
    for (const key in values) {
      set.push(`${key}=$${++i}`);
    }
    await this.db.query(
      `UPDATE car_rentals 
            SET ${set}
            WHERE id=$1`,
      [id, ...Object.values(values)]
    );
  }

  async delete(id: number): Promise<void> {
    await this.db.query(
      `DELETE FROM car_rentals WHERE id=$1`,
      [id],
    );
  }
}
