import { Module } from '@nestjs/common';
import { ConfigsModule } from './config/config.module';
import { RedisModule } from '@/infra/data/cache/redis.module';
import { JwtModule } from '@/infra/cryptography/jwt/jwt.module';
import { HttpModule } from '@/presentation/http.module';

@Module({
  imports: [ConfigsModule, RedisModule, JwtModule, HttpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
