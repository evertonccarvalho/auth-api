import { Injectable } from '@nestjs/common';
import { DefaultUseCase } from '@/shared/domain/use-case/use-case.contract';
import { MovieRepository } from '@/application/contracts/movie.repositoy';
import { UpdateMovieDto } from '@/presentation/dtos/movie';
import { MovieEntity } from '@/domain/model/movie';
import { MoviePresenter } from '@/presentation/presenters/movie.presenter';

export namespace UpdateMovieUseCase {
  export type Input = {
    id: string;
    data: UpdateMovieDto;
  };

  export type Output = MovieEntity;
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
