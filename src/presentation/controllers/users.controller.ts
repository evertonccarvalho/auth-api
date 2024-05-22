import {
  Controller,
  Get,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  Put,
  Body,
  UseInterceptors,
  Inject,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  DeleteUserUseCase,
  GetUserUseCase,
  GetUsersUseCase,
  UpdateUserUseCase,
} from '@/application/use-case/users';
import { UserPresenter } from '@/presentation/presenters/user.presenter';
import { UpdateUserDto, UserOutput } from '@/domain/dtos/users';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { UsersUseCasesProxyModule } from '../usecases-proxy/user-usecases-proxy.module';
import { UseCaseProxy } from '../usecases-proxy/usecases-proxy';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsersUseCasesProxyModule.GET_USER_USECASE_PROXY)
    private readonly getUserUseCase: UseCaseProxy<GetUserUseCase.UseCase>,
    @Inject(UsersUseCasesProxyModule.GET_USERS_USECASES_PROXY)
    private readonly listUsersUseCase: UseCaseProxy<GetUsersUseCase.UseCase>,
    @Inject(UsersUseCasesProxyModule.UPDATE_USER_USECASES_PROXY)
    private readonly updateUserUseCase: UseCaseProxy<UpdateUserUseCase.UseCase>,
    @Inject(UsersUseCasesProxyModule.DELETE_USER_USECASES_PROXY)
    private readonly deleteUserUseCase: UseCaseProxy<DeleteUserUseCase.UseCase>,
  ) {}

  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const output = await this.getUserUseCase.getInstance().execute({ id });
    return new UserPresenter(output);
  }

  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.deleteUserUseCase.getInstance().execute({ id });
  }

  @ApiForbiddenResponse({ description: 'Access denied' })
  @Get()
  @CacheKey('users')
  @UseInterceptors(CacheInterceptor)
  findAll() {
    return this.listUsersUseCase.getInstance().execute();
  }

  @ApiResponse({
    status: 200,
    description: 'User updated',
    type: UserOutput,
  })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateUserDto) {
    const output = await this.updateUserUseCase.getInstance().execute({
      id,
      data: updateDto,
    });

    return new UserPresenter(output);
  }
}
