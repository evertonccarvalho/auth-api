import { DefaultUseCase } from '@/domain/use-case/use-case.contract';
import { HashProvider } from '@/application/contracts/hasher.contract';
import { BadRequestError } from '@/presentation/errors/bad-request-error';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@/domain/model/user';
import { AuthRepository } from '@/application/contracts/repositories/auth.repository';
import { UserPresenter } from '@/presentation/presenters/user.presenter';
import {
  UserOutput,
  UserOutputMapper,
} from '@/application/dtos/users/user-output';

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
