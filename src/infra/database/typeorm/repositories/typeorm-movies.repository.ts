import { MovieEntity } from '@/domain/model/movie';
import { MovieRepository } from '@/domain/repositories/movie.repositoy';
import { UpdateMovieDto } from '@/presentation/dtos/movie';
import { NotFoundErrorException } from '@/shared/application/exceptions/not-found-error.exception';
import { Movie } from '@/shared/infra/database/typeorm/entities/movie.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TypeormMoviesRepository implements MovieRepository {
  private readonly movieRepository: Repository<Movie>;
  constructor(private readonly dataSource: DataSource) {
    this.movieRepository = this.dataSource.getRepository(Movie);
  }

  async insert(movie: MovieEntity): Promise<MovieEntity> {
    return await this.movieRepository.save(movie);
  }

  async findById(id: string): Promise<MovieEntity> {
    return this._get(id);
  }

  async findAll(): Promise<MovieEntity[]> {
    const movies = await this.movieRepository.find();
    return movies;
  }

  async delete(id: string): Promise<void> {
    await this._get(id);
    await this.movieRepository.delete(id);
  }

  async update(id: string, data: UpdateMovieDto): Promise<MovieEntity> {
    const entity = await this.findById(id);

    Object.assign(entity, data);

    const updatedUser = await this.movieRepository.save(entity);
    return updatedUser;
  }

  protected async _get(id: string): Promise<MovieEntity | undefined> {
    try {
      const entity = await this.movieRepository.findOne({ where: { id } });
      if (!entity) {
        throw new NotFoundErrorException('Movie Not found');
      }
      return entity;
    } catch {
      throw new NotFoundErrorException('Movie Not found');
    }
  }
}
