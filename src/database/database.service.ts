import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult } from 'pg';

@Injectable()
export class DatabaseService {
  private pool: Pool;

  constructor(
    private config: ConfigService,
  ) {
    const confDb = config.getOrThrow('database');
    this.pool = new Pool({
      host: confDb.host,
      port: confDb.port,
      user: confDb.user,
      password: confDb.password,
      database: confDb.database,
    });

    // create table
    // TODO: Сделать таблицу для машин? Чтобы в таблице car_rentals была связь (REFERENCES) на id car
    this.query('CREATE TABLE IF NOT EXISTS car_rentals ( id SERIAL PRIMARY KEY, car_id INTEGER, client_id INTEGER, start_date DATE, end_date DATE )');
  }

  query(text: string, params?: string[]): Promise<QueryResult> {
    return this.pool.query(text, params);
  }
}
