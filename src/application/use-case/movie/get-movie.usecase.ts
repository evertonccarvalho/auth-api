import { Injectable } from '@nestjs/common';
import { DefaultUseCase } from '@/application/contracts/use-case.contract';
import { MovieModel } from '@/domain/model/movie';
import { MoviePresenter } from '@/presentation/presenters/movie.presenter';
import { MovieRepository } from '@/application/repositories/movie.repositoy';

export namespace GetMovieUseCase {
  export type Input = { id: string };

  export type Output = MovieModel;
  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly movieRepository: MovieRepository) {}

    async execute(input: Input): Promise<Output> {
      const movie = await this.movieRepository.findById(input.id);
      return new MoviePresenter(movie);
    }
  }
}
