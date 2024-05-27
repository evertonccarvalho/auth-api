// movie.module.ts

import {
  CreateMovieUseCase,
  DeleteMovieUseCase,
  GetMoviesUseCase,
  GetMovieUseCase,
  UpdateMovieUseCase,
} from '@/features/movies/application/use-cases';
import { Module } from '@nestjs/common';
import { MovieRepository } from '../domain/repositories/movie.repositoy';
import { MoviesController } from './controllers/movies.controller';

@Module({
  imports: [],
  controllers: [MoviesController],
  providers: [
    {
      inject: ['MovieRepository'],
      provide: CreateMovieUseCase.UseCase,
      useFactory: (movieRepository: MovieRepository) => {
        return new CreateMovieUseCase.UseCase(movieRepository);
      },
    },
    {
      inject: ['MovieRepository'],
      provide: GetMovieUseCase.UseCase,
      useFactory: (movieRepository: MovieRepository) => {
        return new GetMovieUseCase.UseCase(movieRepository);
      },
    },
    {
      inject: ['MovieRepository'],
      provide: GetMoviesUseCase.UseCase,
      useFactory: (movieRepository: MovieRepository) => {
        return new GetMoviesUseCase.UseCase(movieRepository);
      },
    },
    {
      inject: ['MovieRepository'],
      provide: UpdateMovieUseCase.UseCase,
      useFactory: (movieRepository: MovieRepository) => {
        return new UpdateMovieUseCase.UseCase(movieRepository);
      },
    },
    {
      inject: ['MovieRepository'],
      provide: DeleteMovieUseCase.UseCase,
      useFactory: (movieRepository: MovieRepository) => {
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
