import { Injectable } from '@nestjs/common';
import { IMovieRepository } from '../../contracts/repositories/movie.repositoy';

@Injectable()
export class DeleteMovieUseCase {
  constructor(private readonly movieRepository: IMovieRepository) {}

  async execute(id: string): Promise<void> {
    await this.movieRepository.delete(id);
  }
}
