import {
  Controller,
  Get,
  Body,
  Post,
  UseInterceptors,
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
import { CreateMovieUseCase } from '@/domain/use-case/movie/create-movie';
import { CreateMovieDto, UpdateMovieDto } from './dto';
import { GetMoviesUseCase } from '@/domain/use-case/movie/get-movies';
import { DeleteMovieUseCase } from '@/domain/use-case/movie/delete-movie';
import { GetMovieUseCase } from '@/domain/use-case/movie/get-movie';
import { UpdateMovieUseCase } from '@/domain/use-case/movie/update-movie';
import { SkipAuth } from '@/infra/decorators/auth.decorator';

@SkipAuth()
@ApiTags('Movies')
@ApiBearerAuth()
@Controller('/movies')
export class MoviesController {
  constructor(
    private getMoviesUseCase: GetMoviesUseCase,
    private createMovieUseCase: CreateMovieUseCase,
    private getMovieUseCase: GetMovieUseCase,
    private deleteMoviesUseCase: DeleteMovieUseCase,
    private updateMoviesUseCase: UpdateMovieUseCase,
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
    return this.getMoviesUseCase.execute({});
  }

  @ApiResponse({ status: 404, description: 'Não encontrado' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.getMovieUseCase.execute(id);
  }

  @ApiResponse({ status: 404, description: 'Não encontrado' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.deleteMoviesUseCase.execute(id);
  }

  @ApiResponse({ status: 404, description: 'Não encontrado' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.updateMoviesUseCase.execute(id, updateMovieDto);
  }
}
