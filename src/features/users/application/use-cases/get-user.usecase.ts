import {
  UserOutputMapper,
  UserOutput,
} from '@/features/users/application/dtos/user-output';
import { DefaultUseCase } from '@/shared/domain/use-case/use-case.contract';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';

export namespace GetUserUseCase {
  export type Input = {
    id: string;
  };

  export type Output = UserOutput;
  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.userRepository.findById(input.id);
      return UserOutputMapper.toOutput(entity);
    }
  }
}
