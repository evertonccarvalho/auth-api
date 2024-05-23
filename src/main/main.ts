import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { applyGlobalPipes } from './config/global-pipes.config.ts';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);

  setupSwagger(app);
  applyGlobalPipes(app);
  await app.listen(configService.get('APP.port'));
}

bootstrap();
