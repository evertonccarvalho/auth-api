import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configurations } from './configurations';
import { DataModule } from '../../infra/data/data.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [...configurations],
      isGlobal: true,
    }),
    DataModule.register({
      type: 'typeorm',
      global: true,
    }),
  ],
})
export class ConfigsModule {}
