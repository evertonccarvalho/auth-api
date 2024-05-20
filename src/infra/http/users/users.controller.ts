import {
  Controller,
  Get,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserPresenter } from '@/infra/presenters/user.presenter';

import { GetUserUseCase } from '@/domain/use-case/users/getuser.usecase';
import { DeleteUserUseCase } from '@/domain/use-case/users/delete-user.usecase';
import { ListUsersUseCase } from '@/infra/repositories/listusers.usecase';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly getUserUseCase: GetUserUseCase.UseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase.UseCase,
    private readonly listUsersUseCase: ListUsersUseCase.UseCase,
  ) {}

  @ApiResponse({ status: 404, description: 'Não encontrado' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const output = await this.getUserUseCase.execute({ id }); // Passando um objeto com a chave `id`
    return new UserPresenter(output);
  }
  @ApiResponse({ status: 404, description: 'Não encontrado' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.deleteUserUseCase.execute({ id });
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get()
  findAll() {
    return this.listUsersUseCase.execute();
  }

  // @ApiResponse({ status: 404, description: 'Não encontrado' })
  // @ApiForbiddenResponse({ description: 'Acesso negado' })
  // @Put(':id')
  // update(
  //   @Param('id', new ParseUUIDPipe()) id: string,
  //   @Body() updateUserDto: UpdateUserDto,
  // ) {
  //   return this.SignupUseCase.update(id, updateUserDto);
  // }
}
