// auth.module.ts

import { Module } from '@nestjs/common';
import { HashProvider } from '@/application/contracts/hasher.contract';
import { AuthController } from '@/presentation/controllers/Auth.controller';
import { JwtModule } from '@/infra/cryptography/jwt/jwt.module';
import { BcryptHashProvider } from '@/infra/cryptography/bcrypt/bcrypt-adapter';
import { JwtTokenService } from '@/infra/cryptography/jwt/jwt.service';
import { TypeormAuthRepository } from '@/infra/data/typerom/repositories/typeorm-auth.repository';
import { SignInUseCase, SignUpUseCase } from '@/application/use-case/auth';

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
  ],
  exports: [],
})
export class AuthModule {}
