import { MovieEntity } from '@/domain/model/movie';
import { UpdateMovieDto } from '../../presentation/dtos/movie';
import { RepositoryInterface } from '../../shared/domain/repositories/repository.contract';

export interface MovieRepository extends RepositoryInterface<MovieEntity> {
  insert(data: MovieEntity): Promise<MovieEntity>;
  findById(id: string): Promise<MovieEntity>;
  findAll(): Promise<MovieEntity[]>;
  update(id: string, data: UpdateMovieDto): Promise<MovieEntity>;
  delete(id: string): Promise<void>;
}
