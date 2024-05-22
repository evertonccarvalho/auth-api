import { DynamicModule, Module } from '@nestjs/common';
import { UseCaseProxy } from './usecases-proxy';
import { RepositoriesModule } from '@/infra/data/typerom/repositories/repositories.module';
import { TypeormUsersRepository } from '@/infra/data/typerom/repositories/typeorm-users.repository';
import {
  DeleteUserUseCase,
  GetUsersUseCase,
  GetUserUseCase,
  UpdateUserUseCase,
} from '@/application/use-case/users';

@Module({
  imports: [RepositoriesModule],
})
export class UsersUseCasesProxyModule {
  static GET_USERS_USECASES_PROXY = 'getUsersUsecasesProxy';
  static GET_USER_USECASE_PROXY = 'getUserUsecasesProxy';
  static UPDATE_USER_USECASES_PROXY = 'updateUserUsecasesProxy';
  static DELETE_USER_USECASES_PROXY = 'deleteUserUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsersUseCasesProxyModule,
      providers: [
        {
          inject: [TypeormUsersRepository],
          provide: UsersUseCasesProxyModule.GET_USER_USECASE_PROXY,
          useFactory: (userRepository: TypeormUsersRepository) =>
            new UseCaseProxy(new GetUserUseCase.UseCase(userRepository)),
        },
        {
          inject: [TypeormUsersRepository],
          provide: UsersUseCasesProxyModule.GET_USERS_USECASES_PROXY,
          useFactory: (userRepository: TypeormUsersRepository) =>
            new UseCaseProxy(new GetUsersUseCase.UseCase(userRepository)),
        },
        {
          inject: [TypeormUsersRepository],
          provide: UsersUseCasesProxyModule.UPDATE_USER_USECASES_PROXY,
          useFactory: (userRepository: TypeormUsersRepository) =>
            new UseCaseProxy(new UpdateUserUseCase.UseCase(userRepository)),
        },
        {
          inject: [TypeormUsersRepository],
          provide: UsersUseCasesProxyModule.DELETE_USER_USECASES_PROXY,
          useFactory: (userRepository: TypeormUsersRepository) =>
            new UseCaseProxy(new DeleteUserUseCase.UseCase(userRepository)),
        },
      ],
      exports: [
        UsersUseCasesProxyModule.GET_USER_USECASE_PROXY,
        UsersUseCasesProxyModule.GET_USERS_USECASES_PROXY,
        UsersUseCasesProxyModule.UPDATE_USER_USECASES_PROXY,
        UsersUseCasesProxyModule.DELETE_USER_USECASES_PROXY,
      ],
    };
  }
}
