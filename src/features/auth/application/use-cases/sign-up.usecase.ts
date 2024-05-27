import {
  UserOutputMapper,
  UserOutput,
} from '@/features/users/application/dtos/user-output';
import { UserEntity } from '@/features/users/domain/entities/user';
import { HashProvider } from '@/shared/application/contracts/hasher.contract';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';
import { DefaultUseCase } from '@/shared/domain/use-case/use-case.contract';
import { AuthRepository } from '../../domain/repositories/auth.repository';

export namespace SignUpUseCase {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export type Output = UserOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: AuthRepository,
      private hashProvider: HashProvider,
    ) {}

    async execute(input: Input): Promise<Output> {
      const { email, name, password } = input;

      if (!email || !name || !password) {
        throw new BadRequestError('Input data not provided');
      }

      await this.userRepository.emailExists(email);

      const hashPassword = await this.hashProvider.generateHash(password);

      const entity = new UserEntity(
        Object.assign(input, { password: hashPassword }),
      );

      await this.userRepository.insert(entity);
      return UserOutputMapper.toOutput(entity);
    }
  }
}
