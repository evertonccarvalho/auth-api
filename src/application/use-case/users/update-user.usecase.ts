import { DefaultUseCase } from '@/application/contracts/use-case.contract';
import { IUserRepository } from '@/application/repositories/user.repository';
import { UpdateUserDto, UserOutput } from '@/domain/dtos/users';

export namespace UpdateUserUseCase {
  export type Input = {
    id: string;
    data: UpdateUserDto;
  };

  export type Output = UserOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: IUserRepository) {}

    async execute(input: Input): Promise<Output> {
      const { id, data } = input;

      await this.userRepository.findById(id);

      const updatedUser = await this.userRepository.update(id, data);

      return updatedUser;
    }
  }
}
