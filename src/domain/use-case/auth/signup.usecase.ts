import { DefaultUseCase } from '@/domain/contracts/use-case.contract';
import { SignupDto } from '@/infra/http/auth/dto';
import { HashProvider } from '@/domain/contracts/hash-provider.contract';
import { BadRequestError } from '@/domain/errors/bad-request-error';
import { IUserRepository } from '@/domain/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { UserOutput } from '@/infra/http/users/dto/user-output';
import { UserModel } from '@/domain/model/user';

export namespace SignupUseCase {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export type Output = UserOutput;

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: IUserRepository,
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
