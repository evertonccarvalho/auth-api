import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigsModule } from './infra/config/config.module';

import { RolesGuard } from './infra/guards/role.guard';
import { UsersModule } from './infra/users.module';
import { MoviesModule } from './infra/movies.module';
import { PersistenceModule } from './infra/persistence/persistence.module';
import { JwtServiceModule } from './infra/services/jwt/jwt.module';
import { JwtAuthGuard } from './infra/guards/jwtAuth.guard';

@Module({
  imports: [ConfigsModule, JwtServiceModule, UsersModule, MoviesModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
