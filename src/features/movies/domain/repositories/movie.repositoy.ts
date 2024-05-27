import { MovieEntity } from '@/features/movies/domain/entities/movie';
import { RepositoryInterface } from '../../../../shared/domain/repositories/repository.contract';
import { UpdateMovieDto } from '../dtos';

export interface MovieRepository extends RepositoryInterface<MovieEntity> {
  insert(data: MovieEntity): Promise<MovieEntity>;
  findById(id: string): Promise<MovieEntity>;
  findAll(): Promise<MovieEntity[]>;
  update(id: string, data: UpdateMovieDto): Promise<MovieEntity>;
  delete(id: string): Promise<void>;
}
