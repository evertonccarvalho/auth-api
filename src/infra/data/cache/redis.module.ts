import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { redisStore } from 'cache-manager-ioredis-yet';
import { HttpCacheInterceptor } from './interceptor/http-cache.interceptor';

@Module({
  imports: [
    ConfigModule,
    CacheModule.registerAsync({
      isGlobal: false,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          store: redisStore,
          host: configService.get('CACHE.host'),
          port: configService.get('CACHE.port'),
          ttl: configService.get('CACHE.ttl'),
          max: 2,
        };
      },
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCacheInterceptor,
    },
  ],
  exports: [CacheModule],
})
export class RedisModule {}
