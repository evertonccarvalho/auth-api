import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    CacheModule.registerAsync({
      isGlobal: false,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get('CACHE.ttl'),
        max: configService.get('CACHE.max'),
      }),
    }),
  ],
  exports: [CacheModule],
})
export class CacheManagerModule {}
