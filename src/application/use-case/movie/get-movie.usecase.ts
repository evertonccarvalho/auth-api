import { Injectable } from '@nestjs/common';
import { IMovieRepository } from '../../repositories/movie.repositoy';
import { DefaultUseCase } from '@/application/contracts/use-case.contract';
import { MovieOutput } from '@/domain/dtos/movie';

export namespace GetMovieUseCase {
  export type Input = { id: string };

  export type Output = MovieOutput;
  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly movieRepository: IMovieRepository) {}

    async execute(input: Input): Promise<Output> {
      return await this.movieRepository.findById(input.id);
    }
  }
}
