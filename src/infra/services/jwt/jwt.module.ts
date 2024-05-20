import { Module } from '@nestjs/common';
import { JwtTokenService } from './jwt.service';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtController } from './jwt.controller';
import { UserRepository } from '@/domain/repositories/user.repository';
import { DatabaseUsersRepository } from '@/infra/repositories/database-users.repository';
import { HashProvider } from '@/domain/protocols/hash-provider';
import { BcryptjsHashProvider } from '@/infra/providers/bcrypt/bcryptjs-hash.provider';
import { SignInUseCase } from '@/domain/use-case/users/signip.usecase';
import { SignupUseCase } from '@/domain/use-case/users/signup.usecase';
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
  controllers: [JwtController],
  providers: [
    JwtTokenService,
    {
      provide: UserRepository,
      useClass: DatabaseUsersRepository,
    },
    {
      provide: HashProvider,
      useClass: BcryptjsHashProvider,
    },
    SignInUseCase.UseCase,
    SignupUseCase.UseCase,
  ],
  exports: [JwtTokenService],
})
export class JwtServiceModule {}
