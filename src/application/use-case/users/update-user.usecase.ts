import { DefaultUseCase } from '@/shared/domain/use-case/use-case.contract';
import { UpdateUserDto } from '@/presentation/dtos/users';
import { UserPresenter } from '@/presentation/presenters/user.presenter';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/domain/repositories/user.repository';

export namespace UpdateUserUseCase {
  export type Input = {
    id: string;
    data: UpdateUserDto;
  };

  export type Output = UserPresenter;

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository) {}

    async execute(input: Input): Promise<Output> {
      const { id, data } = input;

      await this.userRepository.findById(id);

      const updatedUser = await this.userRepository.update(id, data);

      return new UserPresenter(updatedUser);
    }
  }
}
