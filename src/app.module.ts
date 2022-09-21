import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";
import { config } from './configs';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config], isGlobal: true }),
    // my modules:
    AuthModule,
    // global:
    DatabaseModule,
    CommonModule,
  ],
})
export class AppModule {}
