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
  UseInterceptors,
  Inject,
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
import {
  CreateMovieUseCase,
  DeleteMovieUseCase,
  GetMoviesUseCase,
  GetMovieUseCase,
  UpdateMovieUseCase,
} from '@/application/use-case/movie';
import { UseCaseProxy } from '../protocols/usecases-proxy';
import { MoviesUseCasesProxyModule } from '../usecases-proxy/movie-usecases-proxy.module';

@Controller('movies')
@ApiTags('Movies')
@ApiBearerAuth()
export class MoviesController {
  constructor(
    @Inject(MoviesUseCasesProxyModule.CREATE_MOVIE_USECASES_PROXY)
    private createMovieUseCase: UseCaseProxy<CreateMovieUseCase.UseCase>,
    @Inject(MoviesUseCasesProxyModule.GET_MOVIES_USECASES_PROXY)
    private getMoviesUseCase: UseCaseProxy<GetMoviesUseCase.UseCase>,
    @Inject(MoviesUseCasesProxyModule.GET_MOVIE_USECASE_PROXY)
    private getMovieUseCase: UseCaseProxy<GetMovieUseCase.UseCase>,
    @Inject(MoviesUseCasesProxyModule.UPDATE_MOVIE_USECASES_PROXY)
    private updateMoviesUseCase: UseCaseProxy<UpdateMovieUseCase.UseCase>,
    @Inject(MoviesUseCasesProxyModule.DELETE_MOVIE_USECASES_PROXY)
    private deleteMoviesUseCase: UseCaseProxy<DeleteMovieUseCase.UseCase>,
  ) {}

  @ApiForbiddenResponse({ description: 'Access denied' })
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    const response = this.createMovieUseCase
      .getInstance()
      .execute(createMovieDto);
    return response;
  }

  @ApiForbiddenResponse({ description: 'Access denied' })
  @Get()
  findAll() {
    return this.getMoviesUseCase.getInstance().execute();
  }

  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.getMovieUseCase.getInstance().execute({ id });
  }

  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.deleteMoviesUseCase.getInstance().execute({ id });
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
    const output = await this.updateMoviesUseCase.getInstance().execute({
      id,
      data: updateMovieDto,
    });
    return output;
  }
}
