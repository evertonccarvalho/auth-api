import { CreateMovieDto } from '@/features/movies/domain/dtos';
import { MovieEntity } from '@/features/movies/domain/entities/movie';
import { DefaultUseCase } from '@/shared/domain/use-case/use-case.contract';
import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../../domain/repositories/movie.repositoy';

export namespace CreateMovieUseCase {
  export type Input = CreateMovieDto;
  export type Output = MovieEntity;
  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly movieRepository: MovieRepository) {}

    async execute(input: Input): Promise<Output> {
      const movie = new MovieEntity(input);
      return await this.movieRepository.insert(movie);
    }
  }
}
