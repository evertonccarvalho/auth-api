import { DefaultUseCase } from '@/application/contracts/use-case.contract';
import { UserRepository } from '@/application/repositories/user.repository';
import { UpdateUserDto, UserOutput } from '@/domain/dtos/users';
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

      await this.userRepository.findById(id);

      const updatedUser = await this.userRepository.update(id, data);

      return updatedUser;
    }
  }
}
