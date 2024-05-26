// movie.module.ts

import { Module } from '@nestjs/common';
import { MoviesController } from '@/presentation/controllers/movies.controller';
import { TypeormMoviesRepository } from '@/infra/data/typerom/repositories/typeorm-movies.repository';
import {
  CreateMovieUseCase,
  DeleteMovieUseCase,
  GetMoviesUseCase,
  GetMovieUseCase,
  UpdateMovieUseCase,
} from '@/application/use-case/movie';

@Module({
  imports: [],
  controllers: [MoviesController],
  providers: [
    {
      inject: ['MovieRepository'],
      provide: CreateMovieUseCase.UseCase,
      useFactory: (movieRepository: TypeormMoviesRepository) => {
        return new CreateMovieUseCase.UseCase(movieRepository);
      },
    },
    {
      inject: ['MovieRepository'],
      provide: GetMovieUseCase.UseCase,
      useFactory: (movieRepository: TypeormMoviesRepository) => {
        return new GetMovieUseCase.UseCase(movieRepository);
      },
    },
    {
      inject: ['MovieRepository'],
      provide: GetMoviesUseCase.UseCase,
      useFactory: (movieRepository: TypeormMoviesRepository) => {
        return new GetMoviesUseCase.UseCase(movieRepository);
      },
    },
    {
      inject: ['MovieRepository'],
      provide: UpdateMovieUseCase.UseCase,
      useFactory: (movieRepository: TypeormMoviesRepository) => {
        return new UpdateMovieUseCase.UseCase(movieRepository);
      },
    },
    {
      inject: ['MovieRepository'],
      provide: DeleteMovieUseCase.UseCase,
      useFactory: (movieRepository: TypeormMoviesRepository) => {
        return new DeleteMovieUseCase.UseCase(movieRepository);
      },
    },
  ],
  exports: [
    CreateMovieUseCase.UseCase,
    GetMovieUseCase.UseCase,
    GetMoviesUseCase.UseCase,
    UpdateMovieUseCase.UseCase,
    DeleteMovieUseCase.UseCase,
  ],
})
export class MovieModule {}
