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
    this.pool = new Pool({ ...confDb });
  }

  query(text: string, params?: any[]): Promise<QueryResult> {
    return this.pool.query(text, params);
  }

  queryOneRow(text: string, params?: any[]): Promise<any> {
    return this.pool.query(text, params).then((result) => {
      return result.rows[0];
    });
  }

  queryManyRows(text: string, params?: any[]): Promise<any> {
    return this.pool.query(text, params).then((result) => {
      return result.rows;
    });
  }
}
