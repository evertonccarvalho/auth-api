import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesUseCasesProxyModule } from '../usecases-proxy/movie-usecases-proxy.module';
import { UsersController } from './users.controller';
import { RedisModule } from '@/infra/data/cache/redis.module';
import { UsersUseCasesProxyModule } from '../usecases-proxy/user-usecases-proxy.module';
import { AuthController } from './Auth.controller';
import { AuthUseCasesProxyModule } from '../usecases-proxy/auth-usecases-proxy.module';

@Module({
  imports: [
    RedisModule,
    MoviesUseCasesProxyModule.register(),
    UsersUseCasesProxyModule.register(),
    AuthUseCasesProxyModule.register(),
  ],
  controllers: [MoviesController, UsersController, AuthController],
})
export class ControllersModule {}
