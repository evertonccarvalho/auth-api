import { Injectable } from '@nestjs/common';
import { MovieModel } from '@/domain/model/movie';
import { IMovieRepository } from '../../contracts/repositories/movie.repositoy';

interface GetMovieUseCaseCommand {}

@Injectable()
export class GetMoviesUseCase {
  constructor(private readonly movieRepository: IMovieRepository) {}

  async execute({}: GetMovieUseCaseCommand): Promise<MovieModel[]> {
    return await this.movieRepository.findAll();
  }
}
