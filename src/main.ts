import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { middlewares } from './middlewares';
import { swagger } from './swagger';
import { config } from './configs';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  middlewares(app);

  swagger(app);

  await app.listen(3000);
}
bootstrap();
