// user.module.ts

import {
  DeleteUserUseCase,
  GetUsersUseCase,
  GetUserUseCase,
  UpdateUserUseCase,
} from '@/features/users/application/use-cases';
import { UsersController } from '@/features/users/presentation/controllers/users.controller';
import { Module } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user.repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    {
      inject: ['UserRepository'],
      provide: GetUserUseCase.UseCase,
      useFactory: (userRepository: UserRepository) => {
        return new GetUserUseCase.UseCase(userRepository);
      },
    },
    {
      inject: ['UserRepository'],
      provide: GetUsersUseCase.UseCase,
      useFactory: (userRepository: UserRepository) => {
        return new GetUsersUseCase.UseCase(userRepository);
      },
    },
    {
      inject: ['UserRepository'],
      provide: UpdateUserUseCase.UseCase,
      useFactory: (userRepository: UserRepository) => {
        return new UpdateUserUseCase.UseCase(userRepository);
      },
    },
    {
      inject: ['UserRepository'],
      provide: DeleteUserUseCase.UseCase,
      useFactory: (userRepository: UserRepository) => {
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
