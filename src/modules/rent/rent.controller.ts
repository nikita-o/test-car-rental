import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RentService } from './rent.service';
import { RentDto } from './dto/rent.dto';
import { ReportDto } from './dto/report.dto';

@Controller('rent')
export class RentController {
  constructor(private rentService: RentService) {}

  @Get('check/:id')
  async checkCar(@Param('id') idCar: number) {
    return await this.rentService.checkCar(idCar);
  }

  @Get('cost')
  cost(@Param('days') days: number): number {
    return this.rentService.cost(days);
  }

  @Post()
  async rentCar(@Body() rent: RentDto): Promise<void> {
    return await this.rentService.rentCar(rent);
  }

  @Get('report')
  async averageLoadReport(): Promise<ReportDto> {
    return await this.rentService.averageLoadReport();
  }
}
