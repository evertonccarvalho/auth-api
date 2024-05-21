import { DefaultUseCase } from '@/domain/protocols/use-case';
import { UserRepository } from '@/domain/repositories/user.repository';
import { UserOutput } from '@/infra/http/users/dto/user-output';
import { Injectable } from '@nestjs/common';
import { UserPresenter } from '@/infra/presenters/user.presenter';

// search-input.ts
export interface SearchInput {
  page: number;
  limit: number;
}

export namespace ListUsersUseCase {
  export type Input = SearchInput;

  export type Output = UserOutput[];

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
