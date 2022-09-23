import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsPositive } from 'class-validator';

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
  @IsDate()
  startDate!: Date;

  @ApiProperty()
  @IsDate()
  endDate!: Date;
}
