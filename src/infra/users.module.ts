import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './http/users/users.controller';
import { UserEntity } from './entities/user.entity';
import { DatabaseUsersRepository } from './repositories/database-users.repository';
import { UserRepository } from '@/domain/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    DatabaseUsersRepository,
    {
      provide: UserRepository,
      useClass: DatabaseUsersRepository,
    },

    // SignupUseCase.UseCase,
    // SignInUseCase.UseCase,
  ],
})
export class UsersModule {}
