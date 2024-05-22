import { registerAs } from '@nestjs/config';
import 'dotenv/config';

export enum ConfigKey {
  app = 'APP',
  db = 'DB',
  ch = 'CASH',
  jwt = 'JWT',
  general = 'GENERAL',
}

export enum Environment {
  Local = 'local',
  Staging = 'staging',
  Testing = 'testing',
  Development = 'development',
  Production = 'production',
}

const APPConfig = registerAs(ConfigKey.app, () => ({
  env:
    Environment[process.env.NODE_ENV as keyof typeof Environment] ||
    'development',
  port: Number(process.env.PORT),
  appName: process.env.APP_NAME,
  isProduction: process.env.NODE_ENV == 'production',
}));

const DBConfig = registerAs(ConfigKey.db, () => ({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
}));

const CACHEConfig = registerAs(ConfigKey.ch, () => ({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  ttl: process.env.CASH_TTL,
  max: process.env.CACHE_MAX,
}));

const JWTConfig = registerAs(ConfigKey.jwt, () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: 86400,
}));

const GeneralConfig = registerAs(ConfigKey.general, () => ({
  salt_or_round: Number(process.env.SALT_OR_ROUND) || 10,
}));

export const configurations = [
  APPConfig,
  DBConfig,
  CACHEConfig,
  JWTConfig,
  GeneralConfig,
];
