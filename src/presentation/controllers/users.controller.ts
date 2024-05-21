import {
  Controller,
  Get,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  Put,
  Body,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../../domain/dtos/users';
import { UserOutput } from '../../domain/dtos/users/user-output';
import { DeleteUserUseCase } from '@/application/use-case/users/delete-user.usecase';
import { GetUserUseCase } from '@/application/use-case/users/get-user.usecase';
import { ListUsersUseCase } from '@/application/use-case/users/get-users.usecase';
import { UpdateUserUseCase } from '@/application/use-case/users/update-user.usecase';
import { UserPresenter } from '@/domain/presenters/user.presenter';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly getUserUseCase: GetUserUseCase.UseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase.UseCase,
    private readonly listUsersUseCase: ListUsersUseCase.UseCase,
    private readonly updateUserUseCase: UpdateUserUseCase.UseCase,
  ) {}

  @ApiResponse({ status: 404, description: 'Não encontrado' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const output = await this.getUserUseCase.execute({ id });
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

  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado',
    type: UserOutput,
  })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateUserDto) {
    const output = await this.updateUserUseCase.execute({
      id,
      data: updateDto,
    });
    return new UserPresenter(output);
  }
}
