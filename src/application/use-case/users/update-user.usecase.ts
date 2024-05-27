import {
  UserOutput,
  UserOutputMapper,
} from '@/application/dtos/users/user-output';
import { UserRepository } from '@/domain/repositories/user.repository';
import { UpdateUserDto } from '@/presentation/dtos/users';
import { DefaultUseCase } from '@/shared/domain/use-case/use-case.contract';
import { Injectable } from '@nestjs/common';

export namespace UpdateUserUseCase {
  export type Input = {
    id: string;
    data: UpdateUserDto;
  };

  export type Output = UserOutput;

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository) {}

    async execute(input: Input): Promise<Output> {
      const { id, data } = input;

      const entity = await this.userRepository.findById(id);

      await this.userRepository.update(id, data);

      return UserOutputMapper.toOutput(entity);
    }
  }
}
