import { EnvConfigModule } from '@/shared/infra/env-config/env-config.module';
import { Module } from '@nestjs/common';
import { DataModule } from '../../shared/infra/database/data.module';

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
