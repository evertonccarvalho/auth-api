// movie-list.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { MovieEntity } from '../../../entities/movie.entity';

export class MovieListDto {
  @ApiProperty({ description: 'Identificador único do filme' })
  id: string;

  @ApiProperty({ description: 'Título do filme' })
  title: string;

  @ApiProperty({ description: 'Título do filme' })
  synopsis: string;

  @ApiProperty({ description: 'Título do filme' })
  duration: number;

  @ApiProperty({ description: 'Nome do diretor do filme' })
  director: string;

  @ApiProperty({ description: 'Ano de lançamento do filme' })
  year: number;

  constructor(movie: MovieEntity) {
    this.id = movie.id;
    this.title = movie.title;
    this.synopsis = movie.synopsis;
    this.duration = movie.duration;
    this.director = movie.director;
    this.year = movie.year;
  }
}
