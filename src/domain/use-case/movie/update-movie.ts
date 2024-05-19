import { MovieModel } from '@/domain/model/movie';
import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../../repositories/movie.repositoy';

interface UpdateMovieUseCaseRequest {
  title?: string;
  synopsis?: string;
  duration?: number;
  director?: string;
  year?: number;
}

@Injectable()
export class UpdateMovieUseCase {
  constructor(private movieRepository: MovieRepository) {}

  async execute(
    id: string,
    data: UpdateMovieUseCaseRequest,
  ): Promise<MovieModel> {
    return this.movieRepository.updateEntity(id, data);
  }
}
