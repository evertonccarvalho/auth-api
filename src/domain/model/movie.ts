import { CreateMovieUseCaseCommand } from '../use-case/movie/create-movie';
export class MovieModel {
  id: string;
  title: string;
  synopsis: string;
  duration: number;
  director: string;
  year: number;

  constructor(props: CreateMovieUseCaseCommand) {
    this.title = props.title;
    this.synopsis = props.synopsis;
    this.duration = props.duration;
    this.director = props.director;
    this.year = props.year;
  }
}
