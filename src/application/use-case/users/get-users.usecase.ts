import { DefaultUseCase } from '@/shared/domain/use-case/use-case.contract';
import { Injectable } from '@nestjs/common';
import { UserPresenter } from '@/presentation/presenters/user.presenter';
import { UserRepository } from '@/domain/repositories/user.repository';

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
