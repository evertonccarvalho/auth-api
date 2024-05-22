import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IMovieRepository } from '@/application/repositories/movie.repositoy';
import { TypeormMoviesRepository } from './repositories/typeorm-movies.repository';
import { IUserRepository } from '@/application/repositories/user.repository';
import { TypeormUsersRepository } from './repositories/typeorm-users.repository';
import { IAuthRepository } from '@/application/repositories/auth.repository';
import { TypeormAuthRepository } from './repositories/typeorm-auth.repository';

import { UserEntity } from './entities/user.entity';
import { MovieEntity } from './entities/movie.entity';

export const getTypeOrmModuleOptions = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DB.host'),
  port: +configService.get<number>('DB.port'),
  username: configService.get('DB.username'),
  password: configService.get('DB.password'),
  database: configService.get('DB.database'),
  entities: [UserEntity, MovieEntity],
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
    TypeOrmModule.forFeature([UserEntity, MovieEntity]),
  ],
  providers: [],
  exports: [],
})
export class TypeOrmDatabaseModule {}
