import { Module } from '@nestjs/common';
import { JwtTokenService } from './jwt.service';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})
export class JwtServiceModule {}
