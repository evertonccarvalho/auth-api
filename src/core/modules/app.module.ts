import { Module } from '@nestjs/common';
import { ConfigsModule } from '../config/config.module';

import { HttpModule } from './http.module';
import { BcryptModule } from '@/infra/cryptography/bcrypt/bcrypt.module';

@Module({
  imports: [ConfigsModule, HttpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
