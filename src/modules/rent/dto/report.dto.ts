import { ApiProperty } from '@nestjs/swagger';

export class ReportCar {
  @ApiProperty()
  carId!: number;

  @ApiProperty()
  percentWorkload!: number;
}

export class ReportDto {
  @ApiProperty()
  report!: ReportCar[];
}
