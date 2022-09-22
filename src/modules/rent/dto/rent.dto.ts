import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber } from 'class-validator';

export class RentDto {
  @ApiProperty()
  @IsNumber()
  idCar!: number;

  @ApiProperty()
  @IsNumber()
  idClient!: number;

  @ApiProperty()
  @IsDate()
  startDate!: Date;

  @ApiProperty()
  @IsDate()
  endDate!: Date;
}
