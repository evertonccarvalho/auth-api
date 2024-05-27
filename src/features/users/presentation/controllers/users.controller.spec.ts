import { UserOutput } from '@/features/users/application/dtos/user-output';
import {
  DeleteUserUseCase,
  GetUserUseCase,
  GetUsersUseCase,
  UpdateUserUseCase,
} from '@/features/users/application/use-cases';
import { UpdateUserDto } from '@/features/users/infra/dtos';
import { UsersController } from '@/features/users/presentation/controllers/users.controller';
import { UserPresenter } from '@/features/users/presentation/presenters/user.presenter';
import { UserRoles } from '@/shared/infra/database/typeorm/enums/roles';
import { UserStatus } from '@/shared/infra/database/typeorm/enums/status';
import { Test, TestingModule } from '@nestjs/testing';

describe('UsersController', () => {
  let sut: UsersController;
  let getUserUseCase: GetUserUseCase.UseCase;
  let deleteUserUseCase: DeleteUserUseCase.UseCase;
  let getUsersUseCase: GetUsersUseCase.UseCase;
  let updateUserUseCase: UpdateUserUseCase.UseCase;
  let id: string;
  let props: UserOutput;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: GetUserUseCase.UseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: DeleteUserUseCase.UseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetUsersUseCase.UseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: UpdateUserUseCase.UseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    sut = module.get<UsersController>(UsersController);
    getUserUseCase = module.get<GetUserUseCase.UseCase>(GetUserUseCase.UseCase);
    deleteUserUseCase = module.get<DeleteUserUseCase.UseCase>(
      DeleteUserUseCase.UseCase,
    );
    getUsersUseCase = module.get<GetUsersUseCase.UseCase>(
      GetUsersUseCase.UseCase,
    );
    updateUserUseCase = module.get<UpdateUserUseCase.UseCase>(
      UpdateUserUseCase.UseCase,
    );

    id = 'df96ae94-6128-486e-840c-b6f78abb4801';
    props = {
      id,
      name: 'John Doe',
      password: 'fake_password',
      email: 'john.doe@example.com',
      status: UserStatus.Active,
      roles: UserRoles.User,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should gets a user', async () => {
    jest.spyOn(getUserUseCase, 'execute').mockResolvedValueOnce(props);

    const presenter = await sut.findOne(id);
    expect(presenter).toBeInstanceOf(UserPresenter);
    expect(presenter).toStrictEqual(new UserPresenter(props));
    expect(getUserUseCase.execute).toHaveBeenCalledWith({ id });
  });

  it('should update a user', async () => {
    const updateDto: UpdateUserDto = { name: 'Jane Doe' };
    const updatedProps = { ...props, ...updateDto };
    jest
      .spyOn(updateUserUseCase, 'execute')
      .mockResolvedValueOnce(updatedProps);

    const result = await sut.update(id, updateDto);
    expect(result).toStrictEqual(new UserPresenter(updatedProps));
    expect(updateUserUseCase.execute).toHaveBeenCalledWith({
      id,
      data: updateDto,
    });
  });

  it('should get all users', async () => {
    const userList: UserOutput[] = [props];
    jest.spyOn(getUsersUseCase, 'execute').mockResolvedValueOnce(userList);

    const presenterList = await sut.findAll();
    const expectedPresenterList = userList.map(
      (user) => new UserPresenter(user),
    );

    expect(presenterList).toEqual(expectedPresenterList);
    expect(getUsersUseCase.execute).toHaveBeenCalled();
  });

  it('should delete a user', async () => {
    const output = undefined;
    jest.spyOn(deleteUserUseCase, 'execute').mockResolvedValueOnce(output);

    const result = await sut.remove(id);
    expect(result).toStrictEqual(output);
    expect(deleteUserUseCase.execute).toHaveBeenCalledWith({ id });
  });
});
