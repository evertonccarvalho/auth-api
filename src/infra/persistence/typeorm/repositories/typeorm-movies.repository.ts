import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieModel } from '@/domain/model/movie';
import { IMovieRepository } from '@/application/repositories/movie.repositoy';
import { MovieEntity } from '../entities/movie.entity';
import { UpdateMovieDto } from '@/domain/dtos/movie';
import { NotFoundErrorException } from '@/presentation/exceptions/not-found-error.exception';

@Injectable()
export class TypeormMoviesRepository implements IMovieRepository {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async insert(movie: MovieEntity): Promise<MovieEntity> {
    return await this.movieRepository.save(movie.toJSON());
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
