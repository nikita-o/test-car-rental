import { nameFields } from '../helpers';

export interface CarRentalsInterface {
  id: number;
  car_id: number;
  client_id: number;
  start_date: Date;
  end_date: Date;
}

export const tableName: string = 'car_rental';
export const namesFields: nameFields<CarRentalsInterface> = {
  car_id: 'car_id',
  client_id: 'client_id',
  end_date: 'end_date',
  start_date: 'start_date',
  id: 'id',
}
