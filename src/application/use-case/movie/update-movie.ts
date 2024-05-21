import { MovieModel } from '@/domain/model/movie';
import { Injectable } from '@nestjs/common';
import { IMovieRepository } from '../../contracts/repositories/movie.repositoy';

interface UpdateMovieUseCaseRequest {
  title?: string;
  synopsis?: string;
  duration?: number;
  director?: string;
  year?: number;
}

@Injectable()
export class UpdateMovieUseCase {
  constructor(private movieRepository: IMovieRepository) {}

  async execute(
    id: string,
    data: UpdateMovieUseCaseRequest,
  ): Promise<MovieModel> {
    return this.movieRepository.update(id, data);
  }
}
