import { Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './http/auth/Auth.controller';
import { IUserRepository } from '@/application/contracts/repositories/user.repository';
import { HashProvider } from '@/application/contracts/hash-provider.contract';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/infra/persistence/typeorm/entities/user.entity';
import { SignInUseCase } from '@/application/use-case/auth/signip.usecase';
import { TypeormUsersRepository } from './persistence/typeorm/repositories/typeorm-users.repository';
import { BcryptjsHashProvider } from './cryptography/bcrypt/bcryptjs-hash.provider';
import { SignupUseCase } from '@/application/use-case/auth/signup.usecase';
import { AuthService } from './cryptography/jwt/auth.service';

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
      provide: IUserRepository,
      useClass: TypeormUsersRepository,
    },
    {
      provide: HashProvider,
      useClass: BcryptjsHashProvider,
    },
    SignInUseCase.UseCase,
    SignupUseCase.UseCase,
  ],
  exports: [AuthService],
})
export class AuhModule {}
