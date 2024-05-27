import { DefaultUseCase } from '@/domain/use-case/use-case.contract';
import { UserRepository } from '@/application/contracts/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { UserPresenter } from '@/presentation/presenters/user.presenter';

// search-input.ts

export namespace GetUsersUseCase {
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
