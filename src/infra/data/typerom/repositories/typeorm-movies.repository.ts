import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { MovieModel } from '@/domain/model/movie';
import { MovieRepository } from '@/application/repositories/movie.repositoy';
import { MovieEntity } from '../entities/movie.entity';
import { UpdateMovieDto } from '@/domain/dtos/movie';
import { NotFoundErrorException } from '@/presentation/exceptions/not-found-error.exception';

@Injectable()
export class TypeormMoviesRepository implements MovieRepository {
  private readonly movieRepository: Repository<MovieEntity>;
  constructor(private readonly dataSource: DataSource) {
    this.movieRepository = this.dataSource.getRepository(MovieEntity);
  }

  async insert(movie: MovieModel): Promise<MovieModel> {
    return await this.movieRepository.save(movie);
  }

  async findById(id: string): Promise<MovieModel> {
    return this._get(id);
  }

  async findAll(): Promise<MovieModel[]> {
    const movies = await this.movieRepository.find();
    return movies;
  }

  async delete(id: string): Promise<void> {
    await this._get(id);
    await this.movieRepository.delete(id);
  }

  async update(id: string, data: UpdateMovieDto): Promise<MovieModel> {
    const entity = await this.findById(id);

    Object.assign(entity, data);

    const updatedUser = await this.movieRepository.save(entity);
    return updatedUser;
  }

  protected async _get(id: string): Promise<MovieModel | undefined> {
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
