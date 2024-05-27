import { UpdateMovieDto } from '@/features/movies/domain/dtos';
import { MovieEntity } from '@/features/movies/domain/entities/movie';
import { MoviePresenter } from '@/features/movies/presentation/presenters/movie.presenter';
import { DefaultUseCase } from '@/shared/domain/use-case/use-case.contract';
import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../../domain/repositories/movie.repositoy';

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
