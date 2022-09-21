import { Client } from 'pg';
import { config } from '../configs';

export async function migration(): Promise<void> {
  const conf = config().database;
  const client = new Client({ ...conf });
  await client.connect();

  // TODO: Сделать таблицу для машин? Чтобы в таблице car_rentals была связь (REFERENCES) на id car
  await client.query('CREATE TABLE IF NOT EXISTS car_rentals ( id SERIAL PRIMARY KEY, car_id INTEGER, client_id INTEGER, start_date DATE, end_date DATE )');

  await client.end();
}
