import { DefaultUseCase } from '@/domain/protocols/use-case';
import { UserRepository } from '@/domain/repositories/user.repository';

export namespace DeleteUserUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository) {}

    async execute(input: Input): Promise<Output> {
      await this.userRepository.delete(input.id);
    }
  }
}
