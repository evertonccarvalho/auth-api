import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-ioredis-yet';

@Module({
  imports: [
    ConfigModule,
    CacheModule.registerAsync({
      isGlobal: false,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          host: configService.get('CACHE.host'),
          port: +configService.get('CACHE.port'),
          ttl: 5,
        });
        return { store };
      },
    }),
  ],
  exports: [CacheModule],
})
export class RedisModule {}
