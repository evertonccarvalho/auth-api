import { DefaultUseCase } from '@/domain/protocols/use-case';
import { UserRepository } from '@/domain/repositories/user.repository';
import { UserOutput } from '@/infra/http/users/dto/user-output';
import { UserOutputMapper } from '@/infra/http/users/dto/user-output.mapper';
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
      return UserOutputMapper.toOutput(entity);
    }
  }
}
