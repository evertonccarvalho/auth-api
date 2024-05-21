import {
  Controller,
  Get,
  Body,
  Post,
  Delete,
  Param,
  Put,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateMovieDto,
  MovieOutput,
  UpdateMovieDto,
} from '../../domain/dtos/movie';

import { UpdateMovieUseCase } from '@/application/use-case/movie/update-movie.usecase';
import { DeleteMovieUseCase } from '@/application/use-case/movie/delete-movie.usecase';
import { GetMovieUseCase } from '@/application/use-case/movie/get-movie.usecase';
import { CreateMovieUseCase } from '@/application/use-case/movie/create-movie.usecase';
import { GetMoviesUseCase } from '@/application/use-case/movie/get-movies.usecase';

@ApiTags('Movies')
@ApiBearerAuth()
@Controller('/movies')
export class MoviesController {
  constructor(
    private getMoviesUseCase: GetMoviesUseCase.UseCase,
    private createMovieUseCase: CreateMovieUseCase.UseCase,
    private getMovieUseCase: GetMovieUseCase.UseCase,
    private deleteMoviesUseCase: DeleteMovieUseCase.UseCase,
    private updateMoviesUseCase: UpdateMovieUseCase.UseCase,
  ) {}

  @ApiForbiddenResponse({ description: 'Access denied' })
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    const response = this.createMovieUseCase.execute(createMovieDto);
    return response;
  }

  @ApiForbiddenResponse({ description: 'Access denied' })
  @Get()
  findAll() {
    return this.getMoviesUseCase.execute();
  }

  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.getMovieUseCase.execute({ id });
  }

  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.deleteMoviesUseCase.execute({ id });
  }

  @ApiResponse({
    status: 200,
    description: 'Movie updated',
    type: MovieOutput,
  })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    const output = await this.updateMoviesUseCase.execute({
      id,
      data: updateMovieDto,
    });
    return output;
  }
}
