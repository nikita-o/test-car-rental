import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { middlewares } from './middlewares';
import { swagger } from './swagger';
import { migration } from './database/migration';

async function bootstrap(): Promise<void> {
  await migration();

  const app = await NestFactory.create(AppModule);

  middlewares(app);

  swagger(app);

  await app.listen(3000);
}

bootstrap();
