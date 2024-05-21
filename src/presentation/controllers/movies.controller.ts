import {
  Controller,
  Get,
  Body,
  Post,
  Delete,
  Param,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMovieDto, UpdateMovieDto } from '../../domain/dtos/movie';

import { UpdateMovieUseCase } from '@/application/use-case/movie/update-movie.usecase';
import { DeleteMovieUseCase } from '@/application/use-case/movie/delete-movie.usecase';
import { GetMovieUseCase } from '@/application/use-case/movie/get-movie.usecase';
import { CreateMovieUseCase } from '@/application/use-case/movie/create-movie.usecase';
import { GetMoviesUseCase } from '@/application/use-case/movie/get-movies.usecase';
import { SkipAuth } from '@/core/decorators/auth.decorator';

@SkipAuth()
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

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    const response = this.createMovieUseCase.execute(createMovieDto);
    return response;
  }

  @Get()
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  findAll() {
    return this.getMoviesUseCase.execute();
  }

  @ApiResponse({ status: 404, description: 'Não encontrado' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.getMovieUseCase.execute({ id });
  }

  @ApiResponse({ status: 404, description: 'Não encontrado' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.deleteMoviesUseCase.execute({ id });
  }

  @ApiResponse({ status: 404, description: 'Não encontrado' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
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
