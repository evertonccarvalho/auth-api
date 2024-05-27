import { JwtModule } from '@/shared/infra/cryptography/jwt/jwt.module';
import { Module } from '@nestjs/common';
import { HttpModule } from '../presentation/http.module';
import { ConfigsModule } from './config/config.module';

@Module({
  imports: [ConfigsModule, HttpModule, JwtModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
