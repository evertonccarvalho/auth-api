import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './http/users/users.controller';
import { UserEntity } from './persistence/typeorm/entities/user.entity';
import { IUserRepository } from '@/application/contracts/repositories/user.repository';
import { GetUserUseCase } from '@/application/use-case/users/getuser.usecase';
import { ListUsersUseCase } from '@/application/use-case/users/listusers.usecase';
import { UpdateUserUseCase } from '@/application/use-case/users/update-user.usecase';
import { DeleteUserUseCase } from '@/application/use-case/users/delete-user.usecase';
import { TypeormUsersRepository } from './persistence/typeorm/repositories/typeorm-users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    {
      provide: IUserRepository,
      useClass: TypeormUsersRepository,
    },
    GetUserUseCase.UseCase,
    ListUsersUseCase.UseCase,
    UpdateUserUseCase.UseCase,
    DeleteUserUseCase.UseCase,
  ],
})
export class UsersModule {}
