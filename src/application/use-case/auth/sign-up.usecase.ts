import { DefaultUseCase } from '@/application/contracts/use-case.contract';
import { HashProvider } from '@/application/contracts/hasher.contract';
import { BadRequestError } from '@/presentation/errors/bad-request-error';
import { Injectable } from '@nestjs/common';
import { UserModel } from '@/domain/model/user';
import { AuthRepository } from '@/application/repositories/auth.repository';
import { UserOutput } from '@/domain/dtos/users';

export namespace SignUpUseCase {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export type Output = UserOutput;

  @Injectable()
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
      const entity = new UserModel({ ...input, password: hashPassword });
      await this.userRepository.insert(entity);

      return entity;
    }
  }
}
