import { Module } from '@nestjs/common';
import { ConfigsModule } from './config/config.module';
import { HttpModule } from '../presentation/http.module';
import { RedisModule } from '@/infra/data/cache/redis.module';
import { JwtModule } from '@/infra/cryptography/jwt/jwt.module';

@Module({
  imports: [ConfigsModule, HttpModule, JwtModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
