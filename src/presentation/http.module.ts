import { RedisModule } from '@/shared/infra/database/cache/redis.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { MovieModule } from './movie.module';
import { UserModule } from './user.module';

@Module({
  imports: [RedisModule, AuthModule, UserModule, MovieModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class HttpModule {}
