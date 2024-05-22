import { Module } from '@nestjs/common';
import { ConfigsModule } from './config/config.module';
import { HttpModule } from '../presentation/http.module';
import { RedisModule } from '@/infra/data/cache/redis.module';

@Module({
  imports: [ConfigsModule, HttpModule, RedisModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
