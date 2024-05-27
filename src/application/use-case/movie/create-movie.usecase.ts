import { MovieEntity } from '@/domain/model/movie';
import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../../contracts/movie.repositoy';
import { DefaultUseCase } from '@/shared/domain/use-case/use-case.contract';
import { CreateMovieDto } from '@/presentation/dtos/movie';

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
