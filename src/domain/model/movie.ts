import { Movie } from '@/infra/data/typerom/entities/movie.entity';
import { v4 as uuidv4 } from 'uuid';

export class MovieEntity extends Movie {
  constructor(props: Partial<MovieEntity>) {
    super();
    Object.assign(this, {
      id: uuidv4(),
      ...props,
    });
  }
}
