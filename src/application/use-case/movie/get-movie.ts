import { Injectable } from '@nestjs/common';
import { IMovieRepository } from '../../contracts/repositories/movie.repositoy';

@Injectable()
export class GetMovieUseCase {
  constructor(private readonly movieRepository: IMovieRepository) {}

  async execute(id: string): Promise<any> {
    return await this.movieRepository.findById(id);
  }
}
