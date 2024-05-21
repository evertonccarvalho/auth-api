import { Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/infra/data/typerom/entities/user.entity';
import { JwtTokenService } from './jwt.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@/core/guards/role.guard';
import { AuthGuard } from '@/core/guards/auth.guard';

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
  providers: [
    JwtTokenService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [JwtTokenService],
})
export class JwtModule {}
