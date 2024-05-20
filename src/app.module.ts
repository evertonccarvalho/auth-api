import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigsModule } from './infra/config/config.module';

import { RolesGuard } from './infra/guards/role.guard';
import { UsersModule } from './infra/users.module';
import { AuthModule } from './infra/auth.module';
import { MoviesModule } from './infra/movies.module';
import { PersistenceModule } from './infra/persistence/persistence.module';

@Module({
  imports: [ConfigsModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
