import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../../repositories/movie.repositoy';
import { DefaultUseCase } from '@/application/contracts/use-case.contract';
import { MovieModel } from '@/domain/model/movie';

export namespace GetMoviesUseCase {
  export type Input = any;

  export type Output = MovieModel[];
  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly movieRepository: MovieRepository) {}

    async execute(): Promise<Output> {
      const result = await this.movieRepository.findAll();
      const items: MovieModel[] = result.map((item) => {
        return item;
      });
      return items;
    }
  }
}
