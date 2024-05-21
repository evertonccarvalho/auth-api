import { MovieModel } from '@/domain/model/movie';
import { UpdateMovieDto } from '@/domain/dtos/movie';

export abstract class IMovieRepository {
  abstract insert(data: MovieModel): Promise<MovieModel>;
  abstract findById(id: string): Promise<MovieModel>;
  abstract findAll(): Promise<MovieModel[]>;
  abstract update(id: string, data: UpdateMovieDto): Promise<MovieModel>;
  abstract delete(id: string): Promise<void>;
}
