import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './http/auth/Auth.controller';
import { UserRepository } from '@/domain/repositories/user.repository';
import { TypeormUsersRepository } from '@/infra/repositories/typeorm-users.repository';
import { HashProvider } from '@/domain/protocols/hash-provider';
import { BcryptjsHashProvider } from '@/infra/providers/bcrypt/bcryptjs-hash.provider';
import { SignInUseCase } from '@/domain/use-case/auth/signip.usecase';
import { SignupUseCase } from '@/domain/use-case/auth/signup.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/infra/entities/user.entity';

@Module({
  imports: [
    Jwt.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService], // Adicionado para corrigir a injeção de dependência
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT.secret'), // Ajustado para obter como string
        signOptions: { expiresIn: configService.get<number>('JWT.expiresIn') }, // Ajustado para obter como número
      }),
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: UserRepository,
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
