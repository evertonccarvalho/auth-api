import { MovieModel } from '@/domain/model/movie';
import { IMovieRepository } from '../../repositories/movie.repositoy';
import { DefaultUseCase } from '@/application/contracts/use-case.contract';
import { CreateMovieDto, MovieOutput } from '@/domain/dtos/movie';

export namespace CreateMovieUseCase {
  export type Input = CreateMovieDto;
  export type Output = MovieOutput;
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly movieRepository: IMovieRepository) {}

    async execute(input: Input): Promise<Output> {
      const movie = new MovieModel(input);
      return await this.movieRepository.insert(movie);
    }
  }
}
