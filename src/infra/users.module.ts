import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './http/users/users.controller';
import { UserEntity } from './entities/user.entity';
import { DatabaseUsersRepository } from './repositories/database-users.repository';
import { BcryptjsHashProvider } from './providers/bcrypt/bcryptjs-hash.provider';
import { SignupUseCase } from '@/domain/use-case/users/signup.usecase';
import { UserRepository } from '@/domain/repositories/user.repository';
import { HashProvider } from '@/domain/protocols/hash-provider';
import { SignInUseCase } from '@/domain/use-case/users/signip.usecase';
import { GetUserUseCase } from '@/domain/use-case/users/getuser.usecase';
import { DeleteUserUseCase } from '@/domain/use-case/users/delete-user.usecase';
import { ListUsersUseCase } from './repositories/listusers.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    {
      provide: UserRepository,
      useClass: DatabaseUsersRepository,
    },
    GetUserUseCase.UseCase,
    ListUsersUseCase.UseCase,
    DeleteUserUseCase.UseCase,
  ],
})
export class UsersModule {}
