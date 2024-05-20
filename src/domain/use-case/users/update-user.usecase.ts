import { DefaultUseCase } from '@/domain/protocols/use-case';
import { UserRepository } from '@/domain/repositories/user.repository';
import { UpdateUserDto } from '@/infra/http/users/dto';
import { UserOutput } from '@/infra/http/users/dto/user-output';
import { UserOutputMapper } from '@/infra/http/users/dto/user-output.mapper';
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

      return UserOutputMapper.toOutput(updatedUser);
    }
  }
}
