import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { middlewares } from './middlewares';
import { swagger } from './swagger';
import { migration } from './database/migration';
import { ConfigService } from '@nestjs/config';

async function bootstrap(): Promise<void> {
  await migration();

  const app = await NestFactory.create(AppModule);

  console.log('loooooooooooooool');

  middlewares(app);

  swagger(app);

  const conf = new ConfigService();
  await app.listen(conf.getOrThrow('port'));
}

bootstrap();
