import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './http/users/users.controller';
import { DatabaseUsersRepository } from './repositories/database-users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthModule } from '@/infra/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService, DatabaseUsersRepository],
})
export class UsersModule {}
