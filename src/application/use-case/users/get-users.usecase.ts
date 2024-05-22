import { DefaultUseCase } from '@/application/contracts/use-case.contract';
import { IUserRepository } from '@/application/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { UserPresenter } from '@/presentation/presenters/user.presenter';
import { UserOutput } from '@/domain/dtos/users';

// search-input.ts

export namespace GetUsersUseCase {
  export type Input = any;

  export type Output = UserOutput[];

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
