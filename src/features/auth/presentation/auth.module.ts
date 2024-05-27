// auth.module.ts

import {
  SignInUseCase,
  SignUpUseCase,
} from '@/features/auth/application/use-cases';
import { HashProvider } from '@/shared/application/contracts/hasher.contract';
import { BcryptHashProvider } from '@/shared/infra/cryptography/bcrypt/bcrypt-adapter';
import { JwtModule } from '@/shared/infra/cryptography/jwt/jwt.module';
import { JwtTokenService } from '@/shared/infra/cryptography/jwt/jwt.service';
import { Module } from '@nestjs/common';
import { AuthRepository } from '../domain/repositories/auth.repository';
import { AuthController } from './controllers/Auth.controller';

@Module({
  imports: [JwtModule],
  controllers: [AuthController],
  providers: [
    {
      provide: 'HashProvider',
      useFactory: () => new BcryptHashProvider(10),
    },
    {
      inject: ['AuthRepository', 'HashProvider', JwtTokenService],
      provide: SignInUseCase.UseCase,
      useFactory: (
        authRepository: AuthRepository,
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
        userRepository: AuthRepository,
        hashProvider: HashProvider,
      ) => {
        return new SignUpUseCase.UseCase(userRepository, hashProvider);
      },
      inject: ['AuthRepository', 'HashProvider'],
    },
  ],
  exports: [],
})
export class AuthModule {}
