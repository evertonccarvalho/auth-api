import { MovieModel } from '@/domain/model/movie';
import { UpdateMovieDto } from '@/domain/dtos/movie';
import { RepositoryInterface } from '../contracts/repository.contract';

export interface MovieRepository extends RepositoryInterface<MovieModel> {
  insert(data: MovieModel): Promise<MovieModel>;
  findById(id: string): Promise<MovieModel>;
  findAll(): Promise<MovieModel[]>;
  update(id: string, data: UpdateMovieDto): Promise<MovieModel>;
  delete(id: string): Promise<void>;
}
