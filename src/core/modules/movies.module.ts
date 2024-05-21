import { Module } from '@nestjs/common';
import { MoviesController } from '../../presentation/controllers/movies.controller';
import { IMovieRepository } from '@/application/repositories/movie.repositoy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from '../../infra/persistence/typeorm/entities/movie.entity';
import { CreateMovieUseCase } from '@/application/use-case/movie/create-movie';
import { GetMovieUseCase } from '@/application/use-case/movie/get-movie';
import { GetMoviesUseCase } from '@/application/use-case/movie/get-movies';
import { UpdateMovieUseCase } from '@/application/use-case/movie/update-movie';
import { DeleteMovieUseCase } from '@/application/use-case/movie/delete-movie';
import { TypeormMoviesRepository } from '../../infra/persistence/typeorm/repositories/typeorm-movies.repository';

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
