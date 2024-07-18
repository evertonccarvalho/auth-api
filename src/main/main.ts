import { EnvConfigService } from '@/shared/infra/env-config/env-config.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { applyGlobalPipes } from './config/global-pipes.config.ts';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3005',
    ],
  });

  app.setGlobalPrefix('api');

  const configService = app.get(EnvConfigService);

  setupSwagger(app);
  applyGlobalPipes(app);
  await app.listen(configService.getAppPort());
}

bootstrap();
