// auth.module.ts

import { Module } from '@nestjs/common';
import { HashProvider } from '@/shared/application/contracts/hasher.contract';
import { AuthController } from '@/presentation/controllers/Auth.controller';
import { JwtModule } from '@/infra/cryptography/jwt/jwt.module';
import { BcryptHashProvider } from '@/infra/cryptography/bcrypt/bcrypt-adapter';
import { JwtTokenService } from '@/infra/cryptography/jwt/jwt.service';
import { SignInUseCase, SignUpUseCase } from '@/application/use-case/auth';
import { AuthRepository } from '@/application/contracts/auth.repository';

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
