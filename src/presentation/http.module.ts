import { IBcryptService } from '@/application/contracts/hash-provider.contract';
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
import { BcryptService } from '@/infra/cryptography/bcrypt/bcrypt.service';
import { AuthController } from '@/presentation/controllers/Auth.controller';
import { MoviesController } from '@/presentation/controllers/movies.controller';
import { UsersController } from '@/presentation/controllers/users.controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '../infra/cryptography/jwt/jwt.module';
import { RedisModule } from '@/infra/data/cache/redis.module';

@Module({
  imports: [JwtModule, RedisModule],
  controllers: [UsersController, MoviesController, AuthController],
  providers: [
    {
      provide: IBcryptService,
      useClass: BcryptService,
    },

    SignInUseCase.UseCase,
    SignUpUseCase.UseCase,
    GetUserUseCase.UseCase,
    ListUsersUseCase.UseCase,
    UpdateUserUseCase.UseCase,
    DeleteUserUseCase.UseCase,
    CreateMovieUseCase.UseCase,
    GetMovieUseCase.UseCase,
    GetMoviesUseCase.UseCase,
    UpdateMovieUseCase.UseCase,
    DeleteMovieUseCase.UseCase,
  ],
  exports: [],
})
export class HttpModule {}
