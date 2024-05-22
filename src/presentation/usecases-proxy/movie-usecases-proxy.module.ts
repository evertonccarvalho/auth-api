import { DynamicModule, Module } from '@nestjs/common';
import { UseCaseProxy } from '../protocols/usecases-proxy';
import { TypeormMoviesRepository } from '@/infra/data/typerom/repositories/typeorm-movies.repository';
import { TypeormRepositoriesModule } from '@/presentation/typeorm-repositories.module';
import {
  CreateMovieUseCase,
  DeleteMovieUseCase,
  GetMoviesUseCase,
  GetMovieUseCase,
  UpdateMovieUseCase,
} from '@/application/use-case/movie';

@Module({
  imports: [TypeormRepositoriesModule],
})
export class MoviesUseCasesProxyModule {
  static CREATE_MOVIE_USECASES_PROXY = 'createMovieUsecasesProxy';
  static GET_MOVIES_USECASES_PROXY = 'getMoviesUsecasesProxy';
  static GET_MOVIE_USECASE_PROXY = 'getMovieUsecasesProxy';
  static UPDATE_MOVIE_USECASES_PROXY = 'updateMovieUsecasesProxy';
  static DELETE_MOVIE_USECASES_PROXY = 'deleteMovieUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: MoviesUseCasesProxyModule,
      providers: [
        {
          inject: [TypeormMoviesRepository],
          provide: MoviesUseCasesProxyModule.CREATE_MOVIE_USECASES_PROXY,
          useFactory: (movieRepository: TypeormMoviesRepository) =>
            new UseCaseProxy(new CreateMovieUseCase.UseCase(movieRepository)),
        },
        {
          inject: [TypeormMoviesRepository],
          provide: MoviesUseCasesProxyModule.GET_MOVIES_USECASES_PROXY,
          useFactory: (movieRepository: TypeormMoviesRepository) =>
            new UseCaseProxy(new GetMoviesUseCase.UseCase(movieRepository)),
        },
        {
          inject: [TypeormMoviesRepository],
          provide: MoviesUseCasesProxyModule.GET_MOVIE_USECASE_PROXY,
          useFactory: (movieRepository: TypeormMoviesRepository) =>
            new UseCaseProxy(new GetMovieUseCase.UseCase(movieRepository)),
        },

        {
          inject: [TypeormMoviesRepository],
          provide: MoviesUseCasesProxyModule.UPDATE_MOVIE_USECASES_PROXY,
          useFactory: (movieRepository: TypeormMoviesRepository) =>
            new UseCaseProxy(new UpdateMovieUseCase.UseCase(movieRepository)),
        },
        {
          inject: [TypeormMoviesRepository],
          provide: MoviesUseCasesProxyModule.DELETE_MOVIE_USECASES_PROXY,
          useFactory: (movieRepository: TypeormMoviesRepository) =>
            new UseCaseProxy(new DeleteMovieUseCase.UseCase(movieRepository)),
        },
      ],
      exports: [
        MoviesUseCasesProxyModule.GET_MOVIE_USECASE_PROXY,
        MoviesUseCasesProxyModule.GET_MOVIES_USECASES_PROXY,
        MoviesUseCasesProxyModule.CREATE_MOVIE_USECASES_PROXY,
        MoviesUseCasesProxyModule.UPDATE_MOVIE_USECASES_PROXY,
        MoviesUseCasesProxyModule.DELETE_MOVIE_USECASES_PROXY,
      ],
    };
  }
}
