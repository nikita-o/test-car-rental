import { Controller, Get, Post } from '@nestjs/common';
import { RentService } from './rent.service';

@Controller()
export class RentController {
  constructor(private rentService: RentService) {}

  @Get()
  async checkCar() {
    return await this.rentService.checkCar();
  }

  @Get()
  async cost() {
    return await this.rentService.cost();
  }

  @Post()
  async rentCar() {
    return await this.rentService.rentCar();
  }

  @Get()
  async averageLoadReport() {
    return await this.rentService.averageLoadReport();
  }
}
