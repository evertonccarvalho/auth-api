import { MovieModel } from '@/domain/model/movie';
import { UpdateMovieDto } from '@/infra/http/movie/dto';

export abstract class MovieRepository {
  abstract findMany(): Promise<MovieModel[]>;
  abstract findById(id: string): Promise<MovieModel>;
  abstract create(data: MovieModel): Promise<MovieModel>;
  abstract updateEntity(id: string, data: UpdateMovieDto): Promise<MovieModel>;
  abstract delete(id: string): Promise<void>;
}
