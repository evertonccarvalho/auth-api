// prisma-movies.repository.ts

import { Injectable } from '@nestjs/common';
import { MovieModel } from '@/domain/model/movie';
import { Prisma } from '@prisma/client';
import { NotFoundErrorException } from '@/presentation/exceptions/not-found-error.exception';
import { UpdateMovieDto } from '@/domain/dtos/movie';
import { IMovieRepository } from '@/application/repositories/movie.repositoy';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaMoviesRepository implements IMovieRepository {
  constructor(private prisma: PrismaService) {}

  async insert(movie: Prisma.MovieCreateInput): Promise<MovieModel> {
    const createdMovie = await this.prisma.movie.create({
      data: movie,
    });
    return createdMovie as MovieModel;
  }

  async findById(id: string): Promise<MovieModel> {
    const movie = await this._get(id);
    return movie as MovieModel;
  }

  async findAll(): Promise<MovieModel[]> {
    const movies = await this.prisma.movie.findMany();
    return movies as MovieModel[];
  }

  async delete(id: string): Promise<void> {
    await this._get(id);
    await this.prisma.movie.delete({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: UpdateMovieDto): Promise<MovieModel> {
    await this._get(id);

    const updatedMovie = await this.prisma.movie.update({
      where: {
        id,
      },
      data,
    });

    return updatedMovie as MovieModel;
  }

  protected async _get(id: string): Promise<MovieModel | null> {
    try {
      const movie = await this.prisma.movie.findUnique({
        where: {
          id,
        },
      });

      if (!movie) {
        throw new NotFoundErrorException('Movie Not found');
      }

      return movie as MovieModel;
    } catch (error) {
      throw new NotFoundErrorException('Movie Not found');
    }
  }
}
