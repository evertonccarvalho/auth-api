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
  NotFoundException,
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
  ListUsersUseCase,
  UpdateUserUseCase,
} from '@/application/use-case/users';
import { UserPresenter } from '@/presentation/presenters/user.presenter';
import { UpdateUserDto, UserOutput } from '@/domain/dtos/users';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly getUserUseCase: GetUserUseCase.UseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase.UseCase,
    private readonly listUsersUseCase: ListUsersUseCase.UseCase,
    private readonly updateUserUseCase: UpdateUserUseCase.UseCase,
  ) {}

  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const output = await this.getUserUseCase.execute({ id });
    return new UserPresenter(output);
  }

  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.deleteUserUseCase.execute({ id });
  }

  @ApiForbiddenResponse({ description: 'Access denied' })
  @Get()
  @CacheKey('users')
  @UseInterceptors(CacheInterceptor)
  findAll() {
    return this.listUsersUseCase.execute();
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
    const output = await this.updateUserUseCase.execute({
      id,
      data: updateDto,
    });

    return new UserPresenter(output);
  }
}
