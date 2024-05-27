import {
  CreateMovieUseCase,
  DeleteMovieUseCase,
  GetMoviesUseCase,
  GetMovieUseCase,
  UpdateMovieUseCase,
} from '@/application/use-case/movie';
import { MovieEntity } from '@/domain/model/movie';
import { CreateMovieDto, UpdateMovieDto } from '@/presentation/dtos/movie';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

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

  @CacheKey('movies')
  @UseInterceptors(CacheInterceptor)
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
    type: MovieEntity,
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
