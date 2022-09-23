import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { middlewares } from './middlewares';
import { swagger } from './swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  middlewares(app);

  swagger(app);

  const conf = new ConfigService();
  await app.listen(conf.getOrThrow('port'));
}

bootstrap();
