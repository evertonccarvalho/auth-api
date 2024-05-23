import { DefaultUseCase } from '@/application/contracts/use-case.contract';
import { UserRepository } from '@/application/repositories/user.repository';
import { UserOutput } from '@/domain/dtos/users';
import { Injectable } from '@nestjs/common';

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
      return entity;
    }
  }
}
