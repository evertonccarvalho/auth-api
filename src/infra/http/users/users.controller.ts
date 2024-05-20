import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { SkipAuth } from '@/infra/decorators/auth.decorator';
import { SignupUseCase } from '@/domain/use-case/users/signup.usecase';
import { SignupDto } from './dto/sign-up.dto';
import { UserPresenter } from '@/infra/presenters/user.presenter';
import { UserOutput } from './dto/user-output';
import { SignInUseCase } from '@/domain/use-case/users/signip.usecase';
import { SigninDto } from '../auth/dto';
import { GetUserUseCase } from '@/domain/use-case/users/getuser.usecase';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly getUserUseCase: GetUserUseCase.UseCase) {}

  @ApiResponse({ status: 404, description: 'Não encontrado' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    console.log('Received ID:', id);
    const output = await this.getUserUseCase.execute({ id }); // Passando um objeto com a chave `id`
    return new UserPresenter(output);
  }

  // @ApiForbiddenResponse({ description: 'Acesso negado' })
  // @Get()
  // findAll() {
  //   return this.SignupUseCase.findAll();
  // }

  // @ApiResponse({ status: 404, description: 'Não encontrado' })
  // @ApiForbiddenResponse({ description: 'Acesso negado' })
  // @Put(':id')
  // update(
  //   @Param('id', new ParseUUIDPipe()) id: string,
  //   @Body() updateUserDto: UpdateUserDto,
  // ) {
  //   return this.SignupUseCase.update(id, updateUserDto);
  // }

  // @ApiResponse({ status: 404, description: 'Não encontrado' })
  // @ApiForbiddenResponse({ description: 'Acesso negado' })
  // @Delete(':id')
  // remove(@Param('id', new ParseUUIDPipe()) id: string) {
  //   return this.SignupUseCase.remove(id);
  // }
}
