import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../../repositories/movie.repositoy';
import { DefaultUseCase } from '@/application/contracts/use-case.contract';
import { MoviePresenter } from '@/domain/model/movie';

export namespace GetMovieUseCase {
  export type Input = { id: string };

  export type Output = MoviePresenter;
  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly movieRepository: MovieRepository) {}

    async execute(input: Input): Promise<Output> {
      const movie = await this.movieRepository.findById(input.id);
      return new MoviePresenter(movie);
    }
  }
}
