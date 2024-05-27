import { MovieEntity } from '@/features/movies/domain/entities/movie';
import { MoviePresenter } from '@/features/movies/presentation/presenters/movie.presenter';
import { DefaultUseCase } from '@/shared/domain/use-case/use-case.contract';
import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../../domain/repositories/movie.repositoy';

export namespace GetMovieUseCase {
  export type Input = { id: string };

  export type Output = MovieEntity;
  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly movieRepository: MovieRepository) {}

    async execute(input: Input): Promise<Output> {
      const movie = await this.movieRepository.findById(input.id);
      return new MoviePresenter(movie);
    }
  }
}
