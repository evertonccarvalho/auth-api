import { IMovieRepository } from '../../repositories/movie.repositoy';
import { MovieOutput, UpdateMovieDto } from '@/domain/dtos/movie';
import { DefaultUseCase } from '@/application/contracts/use-case.contract';

export namespace UpdateMovieUseCase {
  export type Input = {
    id: string;
    data: UpdateMovieDto;
  };

  export type Output = MovieOutput;
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private movieRepository: IMovieRepository) {}

    async execute(input: Input): Promise<Output> {
      const { id, data } = input;
      await this.movieRepository.findById(id);

      return this.movieRepository.update(id, data);
    }
  }
}
