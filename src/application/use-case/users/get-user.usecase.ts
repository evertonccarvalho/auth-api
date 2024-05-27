import { DefaultUseCase } from '@/shared/domain/use-case/use-case.contract';
import { UserPresenter } from '@/presentation/presenters/user.presenter';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/domain/repositories/user.repository';

export namespace GetUserUseCase {
  export type Input = {
    id: string;
  };

  export type Output = UserPresenter;
  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.userRepository.findById(input.id);
      return new UserPresenter(entity);
    }
  }
}
