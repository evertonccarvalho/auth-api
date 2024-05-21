import { MovieModel } from '@/domain/model/movie';
import { Injectable } from '@nestjs/common';
import { IMovieRepository } from '../../contracts/repositories/movie.repositoy';
import { IMovies } from '@/domain/interfaces/movie';

@Injectable()
export class CreateMovieUseCase {
  constructor(private readonly movieRepository: IMovieRepository) {}

  async execute(input: IMovies): Promise<MovieModel> {
    const movie = new MovieModel(input);
    return await this.movieRepository.insert(movie);
  }
}
