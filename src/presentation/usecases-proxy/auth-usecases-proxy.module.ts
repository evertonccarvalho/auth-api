import { DynamicModule, Module } from '@nestjs/common';
import { UseCaseProxy } from '../protocols/usecases-proxy';
import { TypeormRepositoriesModule } from '@/presentation/typeorm-repositories.module';
import { TypeormAuthRepository } from '@/infra/data/typerom/repositories/typeorm-auth.repository';
import { SignInUseCase } from '@/application/use-case/auth/sign-In.usecase';
// import { BcryptService } from '@/infra/cryptography/bcrypt/bcrypt.service';
import { SignUpUseCase } from '@/application/use-case/auth/sign-up.usecase';
import { JwtModule } from '@/infra/cryptography/jwt/jwt.module';
import { JwtTokenService } from '@/infra/cryptography/jwt/jwt.service';
import { BcryptAdapter } from '@/infra/cryptography/bcrypt/bcrypt-adapter';
// import { BcryptModule } from '@/infra/cryptography/bcrypt/bcrypt.module';

@Module({
  imports: [TypeormRepositoriesModule, JwtModule],
})
export class AuthUseCasesProxyModule {
  static SIGNIN_USECASE_PROXY = 'signinAuthUsecasesProxy';
  static SIGNUP_USECASE_PROXY = 'signupAuthUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: AuthUseCasesProxyModule,
      providers: [
        {
          inject: [TypeormAuthRepository, JwtTokenService],
          provide: AuthUseCasesProxyModule.SIGNIN_USECASE_PROXY,
          useFactory: (
            authRepository: TypeormAuthRepository,
            jwtTokenService: JwtTokenService,
            bcryptService: BcryptAdapter,
          ) =>
            new UseCaseProxy(
              new SignInUseCase.UseCase(
                authRepository,
                jwtTokenService,
                bcryptService,
              ),
            ),
        },
        {
          inject: [TypeormAuthRepository, BcryptAdapter],
          provide: AuthUseCasesProxyModule.SIGNUP_USECASE_PROXY,
          useFactory: (
            authRepository: TypeormAuthRepository,
            bcryptService: BcryptAdapter,
          ) =>
            new UseCaseProxy(
              new SignUpUseCase.UseCase(authRepository, bcryptService),
            ),
        },
      ],
      exports: [
        AuthUseCasesProxyModule.SIGNIN_USECASE_PROXY,
        AuthUseCasesProxyModule.SIGNUP_USECASE_PROXY,
      ],
    };
  }
}
