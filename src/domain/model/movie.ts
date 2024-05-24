export class MovieModel {
  id: string;
  title: string;
  synopsis: string;
  duration: number;
  director: string;
  year: number;
}

import { ApiProperty } from '@nestjs/swagger';

export class MoviePresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  synopsis: string;
  @ApiProperty()
  duration: number;
  @ApiProperty()
  director: string;
  @ApiProperty()
  year: number;

  constructor(todo: MovieModel) {
    this.id = todo.id;
    this.title = todo.title;
    this.synopsis = todo.synopsis;
    this.duration = todo.duration;
    this.director = todo.director;
    this.year = todo.year;
  }
}
