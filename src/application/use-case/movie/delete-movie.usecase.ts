import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../../repositories/movie.repositoy';
import { DefaultUseCase } from '@/application/contracts/use-case.contract';

export namespace DeleteMovieUseCase {
  export type Input = { id: string };
  export type Output = void;
  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly movieRepository: MovieRepository) {}

    async execute(input: Input): Promise<Output> {
      await this.movieRepository.delete(input.id);
    }
  }
}
