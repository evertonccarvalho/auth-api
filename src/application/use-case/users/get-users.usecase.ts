import { DefaultUseCase } from '@/application/contracts/use-case.contract';
import { IUserRepository } from '@/application/repositories/user.repository';
import { UserOutput } from '@/domain/dtos/users/user-output';
import { Injectable } from '@nestjs/common';
import { UserPresenter } from '@/domain/presenters/user.presenter';

// search-input.ts

export namespace ListUsersUseCase {
  export type Input = any;

  export type Output = UserOutput[];

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(): Promise<Output> {
      const result = await this.userRepository.findAll();
      const items = result.map((item) => {
        return new UserPresenter(item);
      });

      return items;
    }
  }
}
