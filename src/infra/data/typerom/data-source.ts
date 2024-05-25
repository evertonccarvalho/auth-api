import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  entities: [join(__dirname, '..', '**', 'entities', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '..', '**', 'migrations', '*.{ts,js}')],
  synchronize: true,
  logging: false,
};

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [],
});
