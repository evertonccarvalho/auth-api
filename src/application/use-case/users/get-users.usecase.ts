import { DefaultUseCase } from '@/application/contracts/use-case.contract';
import { UserRepository } from '@/application/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { UserPresenter } from '@/presentation/presenters/user.presenter';

// search-input.ts

export namespace ListUsersUseCase {
  export type Input = any;

  export type Output = UserPresenter[];

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(): Promise<Output> {
      const result = await this.userRepository.findAll();
      const items = result.map((item) => {
        return new UserPresenter(item);
      });

      return items;
    }
  }
}
