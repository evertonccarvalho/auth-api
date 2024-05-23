import { Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtTokenService } from './jwt.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@/main/guards/role.guard';
import { AuthGuard } from '@/main/guards/auth.guard';

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
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    JwtTokenService,
  ],
  exports: [JwtTokenService],
})
export class JwtModule {}
