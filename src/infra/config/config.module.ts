import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configurations } from './configurations';
import { PersistenceModule } from '../persistence/persistence.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [...configurations],
      isGlobal: true,
    }),
    PersistenceModule.register({
      type: 'typeorm',
      global: true,
    }),
  ],
})
export class ConfigsModule {}
