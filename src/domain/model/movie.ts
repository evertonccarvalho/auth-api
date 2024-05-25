import { Movie } from '@/infra/data/typerom/entities/movie.entity';
import { v4 as uuidv4 } from 'uuid';

export class MovieModel extends Movie {
  constructor(props: Partial<MovieModel>) {
    super();
    Object.assign(this, {
      ...props,
      id: uuidv4(),
    });
  }
}
