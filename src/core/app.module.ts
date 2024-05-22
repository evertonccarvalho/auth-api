import { Module } from '@nestjs/common';
import { ConfigsModule } from './config/config.module';
import { HttpModule } from '../presentation/http.module';
import { RedisModule } from '@/infra/data/cache/redis.module';
import { ControllersModule } from '@/presentation/controllers/controllers.module';
import { MoviesUseCasesProxyModule } from '@/presentation/usecases-proxy/movie-usecases-proxy.module';
import { UsersUseCasesProxyModule } from '@/presentation/usecases-proxy/user-usecases-proxy.module';
import { AuthUseCasesProxyModule } from '@/presentation/usecases-proxy/auth-usecases-proxy.module';
import { JwtModule } from '@/infra/cryptography/jwt/jwt.module';
import { BcryptModule } from '@/infra/cryptography/bcrypt/bcrypt.module';

@Module({
  imports: [
    ConfigsModule,
    RedisModule,
    JwtModule,
    BcryptModule,
    MoviesUseCasesProxyModule.register(),
    UsersUseCasesProxyModule.register(),
    AuthUseCasesProxyModule.register(),
    ControllersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
