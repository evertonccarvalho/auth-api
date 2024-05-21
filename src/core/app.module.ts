import { Module } from '@nestjs/common';
import { ConfigsModule } from './config/config.module';
import { HttpModule } from '../presentation/http.module';

@Module({
  imports: [ConfigsModule, HttpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
