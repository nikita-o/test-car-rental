import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { config } from './configs';
import { DatabaseModule } from './database/database.module';
import { RentModule } from './modules/rent/rent.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config], isGlobal: true }),
    // my modules:
    RentModule,
    // global:
    DatabaseModule,
  ],
})
export class AppModule {}
