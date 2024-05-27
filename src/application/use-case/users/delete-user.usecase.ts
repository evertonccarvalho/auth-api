import { DefaultUseCase } from '@/domain/use-case/use-case.contract';
import { UserRepository } from '@/application/contracts/repositories/user.repository';
import { Injectable } from '@nestjs/common';

export namespace DeleteUserUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;
  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository) {}

    async execute(input: Input): Promise<Output> {
      await this.userRepository.delete(input.id);
    }
  }
}
