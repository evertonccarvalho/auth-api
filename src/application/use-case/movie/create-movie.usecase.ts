import { MovieModel } from '@/domain/model/movie';
import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../../repositories/movie.repositoy';
import { DefaultUseCase } from '@/application/contracts/use-case.contract';
import { CreateMovieDto } from '@/application/dtos/movie';

export namespace CreateMovieUseCase {
  export type Input = CreateMovieDto;
  export type Output = MovieModel;
  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly movieRepository: MovieRepository) {}

    async execute(input: Input): Promise<Output> {
      const movie = new MovieModel(input);
      return await this.movieRepository.insert(movie);
    }
  }
}
