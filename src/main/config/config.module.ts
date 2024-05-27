import { Module } from '@nestjs/common';
import { DataModule } from '../../shared/infra/database/data.module';
import { EnvConfigModule } from '@/shared/infra/env-config/env-config.module';

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
