import { DefaultUseCase } from '@/application/contracts/use-case.contract';
import { IUserRepository } from '@/application/repositories/user.repository';
import { Injectable } from '@nestjs/common';

export namespace DeleteUserUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;
  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: IUserRepository) {}

    async execute(input: Input): Promise<Output> {
      await this.userRepository.delete(input.id);
    }
  }
}
