import { Module } from '@nestjs/common';
import { ConfigsModule } from './config/config.module';
import { RedisModule } from '@/infra/data/cache/redis.module';
import { JwtModule } from '@/infra/cryptography/jwt/jwt.module';
import { BcryptModule } from '@/infra/cryptography/bcrypt/bcrypt.module';
import { HttpModule } from '@/presentation/http.module';

@Module({
  imports: [ConfigsModule, RedisModule, JwtModule, BcryptModule, HttpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
