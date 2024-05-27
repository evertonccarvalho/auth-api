import { Movie } from '@/infra/data/typerom/entities/movie.entity';
import { v4 as uuidv4 } from 'uuid';
export class MovieModel {
  id: string;

  title: string;

  synopsis: string;

  duration: number;

  director: string;

  year: number;

  createdAt: Date;

  updatedAt: Date;
}
export class MovieEntity extends MovieModel {
  constructor(props: Partial<MovieEntity>) {
    super();
    Object.assign(this, {
      id: uuidv4(),
      ...props,
    });
  }
}
