import { Injectable } from '@nestjs/common';
import { EnvConfig } from './env-config.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService implements EnvConfig {
  constructor(private configService: ConfigService) {}
  getCacheMax(): number {
    throw new Error('Method not implemented.');
  }

  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV');
  }

  getAppName(): string {
    return this.configService.get<string>('APP_NAME');
  }

  getAppPort(): number {
    return +this.configService.get<number>('PORT');
  }

  getDbHost(): string {
    return this.configService.get<string>('DB_HOST');
  }

  getDbPort(): number {
    return +this.configService.get<number>('DB_PORT');
  }

  getDbUsername(): string {
    return this.configService.get<string>('DB_USER');
  }

  getDbPassword(): string {
    return this.configService.get<string>('DB_PASSWORD');
  }

  getDbDatabaseName(): string {
    return this.configService.get<string>('DB_DATABASE_NAME');
  }

  getRedisHost(): string {
    return this.configService.get<string>('REDIS_HOST');
  }

  getRedisPort(): number {
    return +this.configService.get<number>('REDIS_PORT');
  }

  getCacheTTL(): number {
    return +this.configService.get<number>('CACHE_TTL');
  }

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  getJwtExpiresInSeconds(): number {
    return +this.configService.get<number>('JWT_EXPIRATION');
  }
}
