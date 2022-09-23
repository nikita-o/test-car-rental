import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult } from 'pg';

export type paramType = number | string | boolean | Date

@Injectable()
export class DatabaseService {
  private pool: Pool;

  constructor(
    private config: ConfigService,
  ) {
    const confDb = config.getOrThrow('database');
    this.pool = new Pool({ ...confDb });
  }

  // Base
  query(text: string, params?: paramType[]): Promise<QueryResult> {
    return this.pool.query(text, params);
  }

  queryOneRow<T>(text: string, params?: paramType[]): Promise<T> {
    return this.pool.query(text, params).then((result) => {
      return result.rows[0];
    });
  }

  queryManyRows(text: string, params?: paramType[]): Promise<any> {
    return this.pool.query(text, params).then((result) => {
      return result.rows;
    });
  }

  queryOneRowField<T>(text: string, field: string, params?: paramType[]): Promise<T> {
    return this.pool.query(text, params).then((result) => {
      return result.rows[0][field];
    });
  }

  // CRUD operations
  async create<T>(table: string, entity: T) {
    const set = [];
    let i = 0;
    for (const key in entity) {
      set.push(`$${++i}`);
    }
    await this.query(
      `INSERT INTO ${table} (${Object.keys(entity)}) VALUES (${set})`,
      [...Object.values(entity)],
    );
  }

  read(table: string, id: number) {
    return this.queryOneRow(
      `SELECT * FROM ${table} WHERE id=$1`,
      [id],
    );
  }

  async update<T>(table: string, id: number, values: T) {
    if (!values) throw new Error('no value!');
    const set = [];
    let i = 1;
    for (const key in values) {
      set.push(`${key}=$${++i}`);
    }
    await this.query(
      `UPDATE car_rentals 
            SET ${set}
            WHERE id=$1`,
      [id, ...Object.values(values)],
    );
  }

  async delete(table: string, id: number) {
    await this.query(
      `DELETE FROM ${table} WHERE id=$1`,
      [id],
    );
  }

}
