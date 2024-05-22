import { Module } from '@nestjs/common';
import { MoviesUseCasesProxyModule } from './usecases-proxy/movie-usecases-proxy.module';
import { UsersUseCasesProxyModule } from './usecases-proxy/user-usecases-proxy.module';
import { AuthUseCasesProxyModule } from './usecases-proxy/auth-usecases-proxy.module';
import { MoviesController } from './controllers/movies.controller';
import { UsersController } from './controllers/users.controller';
import { AuthController } from './controllers/Auth.controller';
import { RedisModule } from '@/infra/data/cache/redis.module';

@Module({
  imports: [
    RedisModule,
    MoviesUseCasesProxyModule.register(),
    UsersUseCasesProxyModule.register(),
    AuthUseCasesProxyModule.register(),
  ],
  controllers: [MoviesController, UsersController, AuthController],
  exports: [],
})
export class HttpModule {}
