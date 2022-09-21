import { Get, Injectable, Post } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class RentService {
  constructor(private db: DatabaseService) {}

  async checkCar() {

  }

  async cost() {

  }

  async rentCar() {

  }

  async averageLoadReport() {

  }
}
