import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-ioredis-yet';

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const redisHost = configService.get('CASH.host');
    const redisPort = configService.get('CASH.port');
    const cacheTTL = parseInt(configService.get('CASH.ttl', '5')) * 1000;

    const store = await redisStore({
      host: redisHost,
      port: redisPort,
      ttl: cacheTTL,
    });

    console.log(`Connecting to Redis at ${redisHost}:${redisPort}`);
    console.log(`Connected to Redis`);

    return {
      store: () => store,
    };
  },
  inject: [ConfigService],
};
