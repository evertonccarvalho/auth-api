import { Module } from '@nestjs/common';
import { DataModule } from '../../infra/data/data.module';
import { EnvConfigModule } from '@/main/config/env-config/env-config.module';

@Module({
  imports: [
    EnvConfigModule.forRoot({
      isGlobal: true,
    }),
    DataModule.register({
      type: 'typeorm',
      global: true,
    }),
  ],
})
export class ConfigsModule {}
