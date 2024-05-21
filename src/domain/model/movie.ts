import { IMovies } from '@/domain/interfaces/movie';
import { BaseEntity } from '../entities/base-entity';
export class MovieModel extends BaseEntity<IMovies> {
  id: string;
  title: string;
  synopsis: string;
  duration: number;
  director: string;
  year: number;

  constructor(props: IMovies, id?: string) {
    super(props, id);
    this.title = props.title;
    this.synopsis = props.synopsis;
    this.duration = props.duration;
    this.director = props.director;
    this.year = props.year;
    Object.assign(this, props);
  }
}
