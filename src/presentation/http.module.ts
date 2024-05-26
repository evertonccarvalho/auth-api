import { Module } from '@nestjs/common';
import { MovieModule } from './movie.module';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { RedisModule } from '@/infra/data/cache/redis.module';

@Module({
  imports: [RedisModule, AuthModule, UserModule, MovieModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class HttpModule {}
