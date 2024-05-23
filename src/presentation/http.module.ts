import { HashProvider } from '@/application/contracts/hash-provider.contract';
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
import { JwtModule } from '../infra/cryptography/jwt/jwt.module';
import { RedisModule } from '@/infra/data/cache/redis.module';
import { BcryptHashProvider } from '@/infra/cryptography/bcrypt/bcrypt-adapter';
import { TypeormUsersRepository } from '@/infra/data/typerom/repositories/typeorm-users.repository';
import { TypeormAuthRepository } from '@/infra/data/typerom/repositories/typeorm-auth.repository';
import { JwtTokenService } from '@/infra/cryptography/jwt/jwt.service';
import { IJwtService } from '@/application/contracts/jwt.interface';
import { TypeormMoviesRepository } from '@/infra/data/typerom/repositories/typeorm-movies.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [RedisModule, JwtModule, ConfigModule],
  controllers: [UsersController, MoviesController, AuthController],
  providers: [
    {
      provide: 'HashProvider',
      useFactory: () => new BcryptHashProvider(10),
    },
    // {
    //   provide: 'JwtTokenService',
    //   useFactory: (jwtService: JwtService, configService: ConfigService) => {
    //     return new JwtTokenService(jwtService, configService);
    //   },
    //   inject: [JwtService, ConfigService],
    // },
    // {
    //   inject: ['AuthRepository', 'HashProvider', 'JwtTokenService'],
    //   provide: SignInUseCase.UseCase,
    //   useFactory: (
    //     authRepository: TypeormAuthRepository,
    //     hashProvider: HashProvider,
    //     jwtTokenService: IJwtService,
    //   ) =>
    //     new SignInUseCase.UseCase(
    //       authRepository,
    //       hashProvider,
    //       jwtTokenService,
    //     ),
    // },
    // {
    //   inject: ['AuthRepository', 'HashProvider', 'JwtService'],
    //   provide: SignInUseCase.UseCase,
    //   useFactory: (
    //     authRepository: TypeormAuthRepository,
    //     jwtTokenService: IJwtService,
    //     hashProvider: HashProvider,
    //   ) =>
    //     new SignInUseCase.UseCase(
    //       authRepository,
    //       hashProvider,
    //       jwtTokenService,
    //     ),
    // },
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
      inject: ['UserRepository'],
      provide: CreateMovieUseCase.UseCase,
      useFactory: (movieRepository: TypeormMoviesRepository) => {
        return new CreateMovieUseCase.UseCase(movieRepository);
      },
    },
    {
      inject: ['UserRepository'],
      provide: GetMovieUseCase.UseCase,
      useFactory: (movieRepository: TypeormMoviesRepository) => {
        return new GetMovieUseCase.UseCase(movieRepository);
      },
    },
    {
      inject: ['UserRepository'],
      provide: GetMoviesUseCase.UseCase,
      useFactory: (movieRepository: TypeormMoviesRepository) => {
        return new GetMoviesUseCase.UseCase(movieRepository);
      },
    },
    {
      inject: ['UserRepository'],
      provide: UpdateMovieUseCase.UseCase,
      useFactory: (movieRepository: TypeormMoviesRepository) => {
        return new UpdateMovieUseCase.UseCase(movieRepository);
      },
    },
    {
      inject: ['UserRepository'],
      provide: DeleteMovieUseCase.UseCase,
      useFactory: (movieRepository: TypeormMoviesRepository) => {
        return new DeleteMovieUseCase.UseCase(movieRepository);
      },
    },
  ],
  exports: [],
})
export class HttpModule {}
