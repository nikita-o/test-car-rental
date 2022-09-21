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
    });
  }

  query(text: string, params?: any[]): Promise<QueryResult> {
    return this.pool.query(text, params);
  }
}
