import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../../repositories/movie.repositoy';
import { MovieOutput } from '@/domain/dtos/movie';
import { DefaultUseCase } from '@/application/contracts/use-case.contract';

export namespace GetMoviesUseCase {
  export type Input = any;

  export type Output = MovieOutput[];
  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly movieRepository: MovieRepository) {}

    async execute(): Promise<Output> {
      const result = await this.movieRepository.findAll();
      const items: MovieOutput[] = result.map((item) => {
        return item;
      });
      return items;
    }
  }
}
