import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class RentDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  idCar!: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  idClient!: number;

  @ApiProperty()
  @IsDateString()
  startDate!: string;

  @ApiProperty()
  @IsDateString()
  endDate!: string;
}
