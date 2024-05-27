import { DefaultUseCase } from '@/shared/domain/use-case/use-case.contract';
import { UserRepository } from '@/domain/repositories/user.repository';
import {
  UserOutput,
  UserOutputMapper,
} from '@/application/dtos/users/user-output';

export namespace GetUsersUseCase {
  export type Input = any;

  export type Output = UserOutput[];

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(): Promise<Output> {
      const result = await this.userRepository.findAll();

      return result.map((item) => {
        return UserOutputMapper.toOutput(item);
      });
    }
  }
}
