import { Injectable } from '@nestjs/common';
import { DefaultUseCase } from '@/application/contracts/use-case.contract';
import { MovieRepository } from '@/application/repositories/movie.repositoy';
import { UpdateMovieDto } from '@/application/dtos/movie';
import { MovieModel } from '@/domain/model/movie';
import { MoviePresenter } from '@/presentation/presenters/movie.presenter';

export namespace UpdateMovieUseCase {
  export type Input = {
    id: string;
    data: UpdateMovieDto;
  };

  export type Output = MovieModel;
  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private movieRepository: MovieRepository) {}

    async execute(input: Input): Promise<Output> {
      const { id, data } = input;
      await this.movieRepository.findById(id);

      const newMovie = await this.movieRepository.update(id, data);
      return new MoviePresenter(newMovie);
    }
  }
}
