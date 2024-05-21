import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateMovieDto {
  id: string;
  @ApiProperty({
    description: 'The title of the movie.',
    example: 'Inception',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The synopsis of the movie.',
    example:
      'A thief who enters the dreams of others to steal secrets from their subconscious.',
  })
  @IsNotEmpty()
  @IsString()
  synopsis: string;

  @ApiProperty({
    description: 'The duration of the movie in minutes.',
    example: 148,
  })
  @IsNotEmpty()
  @IsInt()
  duration: number;

  @ApiProperty({
    description: 'The director of the movie.',
    example: 'Christopher Nolan',
  })
  @IsNotEmpty()
  @IsString()
  director: string;

  @ApiProperty({
    description: 'The release year of the movie.',
    example: 2010,
  })
  @IsNotEmpty()
  @IsInt()
  year: number;
}
