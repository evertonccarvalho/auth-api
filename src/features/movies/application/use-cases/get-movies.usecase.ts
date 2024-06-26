import { MovieEntity } from '@/features/movies/domain/entities/movie';
import { MoviePresenter } from '@/features/movies/presentation/presenters/movie.presenter';
import { DefaultUseCase } from '@/shared/domain/use-case/use-case.contract';
import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../../domain/repositories/movie.repositoy';

export namespace GetMoviesUseCase {
  export type Input = any;

  export type Output = MovieEntity[];
  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly movieRepository: MovieRepository) {}

    async execute(): Promise<Output> {
      const result = await this.movieRepository.findAll();
      const items: MoviePresenter[] = result.map((item) => {
        return item;
      });
      return items;
    }
  }
}
