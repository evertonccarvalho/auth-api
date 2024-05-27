import { MovieEntity } from '@/features/movies/domain/entities/movie';
import { ApiProperty } from '@nestjs/swagger';

export class MoviePresenter {
  @ApiProperty({ description: 'Identificação do Filme' })
  id: string;

  @ApiProperty({ description: 'Título do Filme' })
  title: string;

  @ApiProperty({ description: 'Sinopse do Filme' })
  synopsis: string;

  @ApiProperty({ description: 'Duração do Filme em minutos' })
  duration: number;

  @ApiProperty({ description: 'Diretor do Filme' })
  director: string;

  @ApiProperty({ description: 'Ano de Lançamento do Filme' })
  year: number;

  @ApiProperty({ description: 'Data de Criação do Filme' })
  createdAt: Date;

  @ApiProperty({ description: 'Data da Última Atualização do Filme' })
  updatedAt: Date;

  constructor(props: MovieEntity) {
    this.id = props.id;
    this.title = props.title;
    this.synopsis = props.synopsis;
    this.duration = props.duration;
    this.director = props.director;
    this.year = props.year;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
