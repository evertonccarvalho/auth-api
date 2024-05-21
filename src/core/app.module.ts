import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigsModule } from './config/config.module';

import { UsersModule } from '../infra/users.module';
import { MoviesModule } from '../infra/movies.module';
import { AuhModule } from '../infra/auth.module';
import { RolesGuard } from './guards/role.guard';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [ConfigsModule, AuhModule, UsersModule, MoviesModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
