import { Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from '../../presentation/controllers/Auth.controller';
import { HashProvider } from '@/application/contracts/hash-provider.contract';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/infra/persistence/typeorm/entities/user.entity';
import { SignInUseCase } from '@/application/use-case/auth/sign-In.usecase';
import { BcryptjsHashProvider } from '../../infra/cryptography/bcrypt/bcryptjs-hash.provider';
import { AuthService } from '../../infra/cryptography/jwt/auth.service';
import { SignUpUseCase } from '@/application/use-case/auth/sign-up.usecase';
import { IAuthRepository } from '@/application/repositories/auth.repository';
import { TypeormAuthRepository } from '@/infra/persistence/typeorm/repositories/typeorm-auth.repository';

@Module({
  imports: [
    Jwt.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT.secret'),
        signOptions: { expiresIn: configService.get<number>('JWT.expiresIn') },
      }),
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: IAuthRepository,
      useClass: TypeormAuthRepository,
    },
    {
      provide: HashProvider,
      useClass: BcryptjsHashProvider,
    },
    SignInUseCase.UseCase,
    SignUpUseCase.UseCase,
  ],
  exports: [AuthService],
})
export class AuhModule {}
