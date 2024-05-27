import { RedisModule } from '@/shared/infra/database/cache/redis.module';
import { Module } from '@nestjs/common';
import { AuthModule } from '../../features/auth/presentation/auth.module';
import { MovieModule } from '../../features/movies/presentation/movie.module';
import { UserModule } from '../../features/users/presentation/user.module';

@Module({
  imports: [RedisModule, AuthModule, UserModule, MovieModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class HttpModule {}
