import { Module } from '@nestjs/common';
import { MovieModule } from './movie.module';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [AuthModule, UserModule, MovieModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class HttpModule {}
