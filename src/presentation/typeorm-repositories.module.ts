import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormMoviesRepository } from '../infra/data/typerom/repositories/typeorm-movies.repository';
import { TypeormUsersRepository } from '../infra/data/typerom/repositories/typeorm-users.repository';
import { TypeOrmDatabaseModule } from '../infra/data/typerom/typeorm.module';
import { MovieEntity } from '../infra/data/typerom/entities/movie.entity';
import { UserEntity } from '../infra/data/typerom/entities/user.entity';
import { TypeormAuthRepository } from '../infra/data/typerom/repositories/typeorm-auth.repository';

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
export class TypeormRepositoriesModule {}
