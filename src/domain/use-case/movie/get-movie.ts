import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../../repositories/movie.repositoy';

@Injectable()
export class GetMovieUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(id: string): Promise<any> {
    return await this.movieRepository.findById(id);
  }
}
