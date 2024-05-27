import { Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { JwtTokenService } from './jwt.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@/shared/application/guards/role.guard';
import { AuthGuard } from '@/shared/application/guards/auth.guard';
import { EnvConfigService } from '@/shared/infra/env-config/env-config.service';
import { EnvConfigModule } from '@/shared/infra/env-config/env-config.module';

@Module({
  imports: [
    EnvConfigModule,
    Jwt.registerAsync({
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useFactory: async (configService: EnvConfigService) => ({
        global: true,
        secret: configService.getJwtSecret(),
        signOptions: { expiresIn: configService.getJwtExpiresInSeconds() },
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
