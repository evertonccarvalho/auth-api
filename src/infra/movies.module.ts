import { Module } from '@nestjs/common';
import { MoviesController } from './http/movie/movies.controller';
import { TypeormMoviesRepository } from './repositories/typeorm-movies.repository';
import { GetMovieUseCase } from '@/domain/use-case/movie/get-movie';
import { GetMoviesUseCase } from '@/domain/use-case/movie/get-movies';
import { UpdateMovieUseCase } from '@/domain/use-case/movie/update-movie';
import { DeleteMovieUseCase } from '@/domain/use-case/movie/delete-movie';
import { IMovieRepository } from '@/domain/repositories/movie.repositoy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './persistence/typeorm/entities/movie.entity';
import { CreateMovieUseCase } from '@/domain/use-case/movie/create-movie';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  controllers: [MoviesController],
  providers: [
    {
      provide: IMovieRepository,
      useClass: TypeormMoviesRepository,
    },
    CreateMovieUseCase,
    GetMovieUseCase,
    GetMoviesUseCase,
    UpdateMovieUseCase,
    DeleteMovieUseCase,
  ],
})
export class MoviesModule {}
