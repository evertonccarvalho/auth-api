import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { UserEntity } from '@/infra/entities/user.entity';
import { MovieEntity } from '@/infra/entities/movie.entity';

export const getTypeOrmModuleOptions = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DB.host'),
  port: +configService.get<number>('DB.port'),
  username: configService.get('DB.username'),
  password: configService.get('DB.password'),
  database: configService.get('DB.database'),
  entities: [join(__dirname, '..', '..', '**', 'entities', '*.entity.{ts,js}')],
  synchronize: true,
  logging: false,
});

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmDatabaseModule {}
