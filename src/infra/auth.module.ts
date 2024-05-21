import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './http/auth/Auth.controller';
import { IUserRepository } from '@/domain/repositories/user.repository';
import { TypeormUsersRepository } from '@/infra/repositories/typeorm-users.repository';
import { HashProvider } from '@/domain/contracts/hash-provider.contract';
import { BcryptjsHashProvider } from '@/infra/providers/bcrypt/bcryptjs-hash.provider';
import { SignInUseCase } from '@/domain/use-case/auth/signip.usecase';
import { SignupUseCase } from '@/domain/use-case/auth/signup.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/infra/persistence/typeorm/entities/user.entity';

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
