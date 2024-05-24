import { HashProvider } from '@/application/contracts/hasher.contract';
import { SignInUseCase } from '@/application/use-case/auth/sign-In.usecase';
import { SignUpUseCase } from '@/application/use-case/auth/sign-up.usecase';
import {
  CreateMovieUseCase,
  DeleteMovieUseCase,
  GetMoviesUseCase,
  GetMovieUseCase,
  UpdateMovieUseCase,
} from '@/application/use-case/movie';
import {
  DeleteUserUseCase,
  GetUserUseCase,
  ListUsersUseCase,
  UpdateUserUseCase,
} from '@/application/use-case/users';
import { AuthController } from '@/presentation/controllers/Auth.controller';
import { MoviesController } from '@/presentation/controllers/movies.controller';
import { UsersController } from '@/presentation/controllers/users.controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '@/infra/cryptography/jwt/jwt.module';
import { BcryptHashProvider } from '@/infra/cryptography/bcrypt/bcrypt-adapter';
import { ConfigModule } from '@nestjs/config';
import { JwtTokenService } from '@/infra/cryptography/jwt/jwt.service';
import { TypeormAuthRepository } from '@/infra/data/typerom/repositories/typeorm-auth.repository';
import { TypeormUsersRepository } from '@/infra/data/typerom/repositories/typeorm-users.repository';
import { TypeormMoviesRepository } from '@/infra/data/typerom/repositories/typeorm-movies.repository';

@Module({
  imports: [JwtModule, ConfigModule],
  controllers: [UsersController, MoviesController, AuthController],
  providers: [
    {
      provide: 'HashProvider',
      useFactory: () => new BcryptHashProvider(10),
    },
    {
      inject: ['AuthRepository', 'HashProvider', JwtTokenService],
      provide: SignInUseCase.UseCase,
      useFactory: (
        authRepository: TypeormAuthRepository,
        hashProvider: HashProvider,
        jwtTokenService: JwtTokenService,
      ) =>
        new SignInUseCase.UseCase(
          authRepository,
          hashProvider,
          jwtTokenService,
        ),
    },
    {
      provide: SignUpUseCase.UseCase,
      useFactory: (
        userRepository: TypeormAuthRepository,
        hashProvider: HashProvider,
      ) => {
        return new SignUpUseCase.UseCase(userRepository, hashProvider);
      },
      inject: ['AuthRepository', 'HashProvider'],
    },
    {
      inject: ['UserRepository'],
      provide: GetUserUseCase.UseCase,
      useFactory: (userRepository: TypeormUsersRepository) => {
        return new GetUserUseCase.UseCase(userRepository);
      },
    },
    {
      inject: ['UserRepository'],
      provide: ListUsersUseCase.UseCase,
      useFactory: (userRepository: TypeormUsersRepository) => {
        return new ListUsersUseCase.UseCase(userRepository);
      },
    },
    {
      inject: ['UserRepository'],
      provide: UpdateUserUseCase.UseCase,
      useFactory: (userRepository: TypeormUsersRepository) => {
        return new UpdateUserUseCase.UseCase(userRepository);
      },
    },
    {
      inject: ['UserRepository'],
      provide: DeleteUserUseCase.UseCase,
      useFactory: (userRepository: TypeormUsersRepository) => {
        return new DeleteUserUseCase.UseCase(userRepository);
      },
    },
    {
      inject: ['MovieRepository'],
      provide: CreateMovieUseCase.UseCase,
      useFactory: (movieRepository: TypeormMoviesRepository) => {
        return new CreateMovieUseCase.UseCase(movieRepository);
      },
    },
    {
      inject: ['MovieRepository'],
      provide: GetMovieUseCase.UseCase,
      useFactory: (movieRepository: TypeormMoviesRepository) => {
        return new GetMovieUseCase.UseCase(movieRepository);
      },
    },
    {
      inject: ['MovieRepository'],
      provide: GetMoviesUseCase.UseCase,
      useFactory: (movieRepository: TypeormMoviesRepository) => {
        return new GetMoviesUseCase.UseCase(movieRepository);
      },
    },
    {
      inject: ['MovieRepository'],
      provide: UpdateMovieUseCase.UseCase,
      useFactory: (movieRepository: TypeormMoviesRepository) => {
        return new UpdateMovieUseCase.UseCase(movieRepository);
      },
    },
    {
      inject: ['MovieRepository'],
      provide: DeleteMovieUseCase.UseCase,
      useFactory: (movieRepository: TypeormMoviesRepository) => {
        return new DeleteMovieUseCase.UseCase(movieRepository);
      },
    },
  ],
  exports: [],
})
export class HttpModule {}
