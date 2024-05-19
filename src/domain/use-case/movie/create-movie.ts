import { MovieModel } from '@/domain/model/movie';
import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../../repositories/movie.repositoy';

export interface CreateMovieUseCaseCommand {
  title: string;
  synopsis: string;
  duration: number;
  director: string;
  year: number;
}
@Injectable()
export class CreateMovieUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(input: CreateMovieUseCaseCommand): Promise<MovieModel> {
    const movie = new MovieModel(input);
    return await this.movieRepository.create(movie);
  }
}
