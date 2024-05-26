// user.module.ts

import { Module } from '@nestjs/common';
import { UsersController } from '@/presentation/controllers/users.controller';
import { TypeormUsersRepository } from '@/infra/data/typerom/repositories/typeorm-users.repository';
import {
  DeleteUserUseCase,
  GetUsersUseCase,
  GetUserUseCase,
  UpdateUserUseCase,
} from '@/application/use-case/users';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    {
      inject: ['UserRepository'],
      provide: GetUserUseCase.UseCase,
      useFactory: (userRepository: TypeormUsersRepository) => {
        return new GetUserUseCase.UseCase(userRepository);
      },
    },
    {
      inject: ['UserRepository'],
      provide: GetUsersUseCase.UseCase,
      useFactory: (userRepository: TypeormUsersRepository) => {
        return new GetUsersUseCase.UseCase(userRepository);
      },
    },
    {
      inject: ['UserRepository'],
      provide: UpdateUserUseCase.UseCase,
      useFactory: (userRepository: TypeormUsersRepository) => {
        return new UpdateUserUseCase.UseCase(userRepository);
      },
    },
    {
      inject: ['UserRepository'],
      provide: DeleteUserUseCase.UseCase,
      useFactory: (userRepository: TypeormUsersRepository) => {
        return new DeleteUserUseCase.UseCase(userRepository);
      },
    },
  ],
  exports: [
    GetUsersUseCase.UseCase,
    GetUserUseCase.UseCase,
    UpdateUserUseCase.UseCase,
    DeleteUserUseCase.UseCase,
  ],
})
export class UserModule {}
