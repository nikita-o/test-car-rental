import { ApiProperty } from '@nestjs/swagger';

export class RentDto {
  @ApiProperty()
  idCar!: number;

  @ApiProperty()
  idClient!: number;

  @ApiProperty({ type: Date })
  startDate!: string;

  @ApiProperty({ type: Date })
  endDate!: string;
}
