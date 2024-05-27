import { DefaultUseCase } from '@/shared/domain/use-case/use-case.contract';
import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../../domain/repositories/movie.repositoy';

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
