import { Module } from '@nestjs/common';
import { AuthModule } from '@/infra/auth.module';
import { MoviesController } from './http/movie/movies.controller';
import { DatabaseMoviesRepository } from './repositories/database-movies.repository';
import { GetMovieUseCase } from '@/domain/use-case/movie/get-movie';
import { GetMoviesUseCase } from '@/domain/use-case/movie/get-movies';
import { UpdateMovieUseCase } from '@/domain/use-case/movie/update-movie';
import { DeleteMovieUseCase } from '@/domain/use-case/movie/delete-movie';
import { MovieRepository } from '@/domain/repositories/movie.repositoy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { CreateMovieUseCase } from '@/domain/use-case/movie/create-movie';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([MovieEntity])],
  controllers: [MoviesController],
  providers: [
    // Fornecendo o repositório específico para filmes como provedor de MovieRepository
    DatabaseMoviesRepository,
    {
      provide: MovieRepository,
      useClass: DatabaseMoviesRepository,
    },
    // Outros casos de uso
    CreateMovieUseCase,
    GetMovieUseCase,
    GetMoviesUseCase,
    UpdateMovieUseCase,
    DeleteMovieUseCase,
  ],
})
export class MoviesModule {}
