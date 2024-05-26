import { EnvConfigModule } from '@/infra/env-config/env-config.module';
import { EnvConfigService } from '@/infra/env-config/env-config.service';
import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [EnvConfigModule],
  useFactory: async (configService: EnvConfigService) => {
    const redisHost = configService.getRedisHost();
    const redisPort = configService.getRedisPort();
    console.log(`Connecting to Redis at ${redisHost}:${redisPort}`);

    const store = await redisStore({
      host: redisHost,
      port: redisPort,
      ttl: 30 * 1000,
    });

    console.log(`Connected to Redis`);

    return {
      store: () => store,
    };
  },
  inject: [EnvConfigService],
};
