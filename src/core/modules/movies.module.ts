import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesController } from '../../presentation/controllers/movies.controller';
import { MovieEntity } from '../../infra/persistence/typeorm/entities/movie.entity';
import { IMovieRepository } from '@/application/repositories/movie.repositoy';
import { TypeormMoviesRepository } from '../../infra/persistence/typeorm/repositories/typeorm-movies.repository';
import {
  CreateMovieUseCase,
  DeleteMovieUseCase,
  GetMoviesUseCase,
  GetMovieUseCase,
  UpdateMovieUseCase,
} from '@/application/use-case/movie';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  controllers: [MoviesController],
  providers: [
    {
      provide: IMovieRepository,
      useClass: TypeormMoviesRepository,
    },
    CreateMovieUseCase.UseCase,
    GetMovieUseCase.UseCase,
    GetMoviesUseCase.UseCase,
    UpdateMovieUseCase.UseCase,
    DeleteMovieUseCase.UseCase,
  ],
})
export class MoviesModule {}
