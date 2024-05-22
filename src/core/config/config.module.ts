import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configurations } from './configurations';
import { TypeOrmDatabaseModule } from '@/infra/data/typerom/typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [...configurations],
      isGlobal: true,
    }),
    TypeOrmDatabaseModule,
  ],
})
export class ConfigsModule {}
