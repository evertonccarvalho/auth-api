import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigsModule } from './infra/config/config.module';

import { RolesGuard } from './infra/guards/role.guard';
import { UsersModule } from './infra/users.module';
import { MoviesModule } from './infra/movies.module';
import { AuhModule } from './infra/auth.module';
import { AuthGuard } from './infra/guards/auth.guard';

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
