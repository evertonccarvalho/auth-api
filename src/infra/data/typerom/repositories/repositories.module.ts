import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormMoviesRepository } from './typeorm-movies.repository';
import { TypeormUsersRepository } from './typeorm-users.repository';
import { TypeOrmDatabaseModule } from '../typeorm.module';
import { MovieEntity } from '../entities/movie.entity';
import { UserEntity } from '../entities/user.entity';
import { TypeormAuthRepository } from './typeorm-auth.repository';

@Module({
  imports: [
    TypeOrmDatabaseModule,
    TypeOrmModule.forFeature([MovieEntity, UserEntity]),
  ],
  providers: [
    TypeormMoviesRepository,
    TypeormUsersRepository,
    TypeormAuthRepository,
  ],
  exports: [
    TypeormMoviesRepository,
    TypeormUsersRepository,
    TypeormAuthRepository,
  ],
})
export class RepositoriesModule {}
