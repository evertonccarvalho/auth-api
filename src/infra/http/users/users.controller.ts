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

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly signupUseCase: SignupUseCase.UseCase) {}

  @SkipAuth()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 409, description: 'Conflito de email' })
  async create(@Body() signupDto: SignupDto) {
    const response = await this.signupUseCase.execute(signupDto);
    return new UserPresenter(response);
  }
  // @ApiForbiddenResponse({ description: 'Acesso negado' })
  // @Get()
  // findAll() {
  //   return this.SignupUseCase.findAll();
  // }

  // @ApiResponse({ status: 404, description: 'Não encontrado' })
  // @ApiForbiddenResponse({ description: 'Acesso negado' })
  // @Get(':id')
  // findOne(@Param('id', new ParseUUIDPipe()) id: string) {
  //   return this.SignupUseCase.findOne(id);
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
