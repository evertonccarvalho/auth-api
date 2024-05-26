import { Test, TestingModule } from '@nestjs/testing';
import {
  DeleteUserUseCase,
  GetUserUseCase,
  GetUsersUseCase,
  UpdateUserUseCase,
} from '@/application/use-case/users';
import { UpdateUserDto } from '@/domain/dtos/users';
import { UsersController } from '@/presentation/controllers/users.controller';
import { UserPresenter } from '@/presentation/presenters/user.presenter';
import { UserStatus } from '@/domain/enums/status';
import { UserRoles } from '@/domain/enums/roles';
import { RedisModule } from '@/infra/data/cache/redis.module';

describe('UsersController', () => {
  let controller: UsersController;
  let getUserUseCase: GetUserUseCase.UseCase;
  let deleteUserUseCase: DeleteUserUseCase.UseCase;
  let listUsersUseCase: GetUsersUseCase.UseCase;
  let updateUserUseCase: UpdateUserUseCase.UseCase;

  const userPresenter = new UserPresenter({
    id: 'some-uuid',
    name: 'John Doe',
    password: 'fake_password',
    email: 'john.doe@example.com',
    status: UserStatus.Active,
    roles: UserRoles.User,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const userListPresenter = [
    new UserPresenter({
      id: 'some-uuid',
      name: 'John Doe',
      password: 'fake_password',
      email: 'john.doe@example.com',
      status: UserStatus.Active,
      roles: UserRoles.User,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RedisModule],
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

    controller = module.get<UsersController>(UsersController);
    getUserUseCase = module.get<GetUserUseCase.UseCase>(GetUserUseCase.UseCase);
    deleteUserUseCase = module.get<DeleteUserUseCase.UseCase>(
      DeleteUserUseCase.UseCase,
    );
    listUsersUseCase = module.get<GetUsersUseCase.UseCase>(
      GetUsersUseCase.UseCase,
    );
    updateUserUseCase = module.get<UpdateUserUseCase.UseCase>(
      UpdateUserUseCase.UseCase,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const id = 'some-uuid';
      jest
        .spyOn(getUserUseCase, 'execute')
        .mockResolvedValueOnce(userPresenter);

      expect(await controller.findOne(id)).toEqual(userPresenter);
      expect(getUserUseCase.execute).toHaveBeenCalledWith({ id });
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const id = 'some-uuid';
      jest.spyOn(deleteUserUseCase, 'execute').mockResolvedValueOnce(undefined);

      expect(await controller.remove(id)).toBeUndefined();
      expect(deleteUserUseCase.execute).toHaveBeenCalledWith({ id });
    });
  });

  describe('findAll', () => {
    it('should return a list of users', async () => {
      jest
        .spyOn(listUsersUseCase, 'execute')
        .mockResolvedValueOnce(userListPresenter);

      expect(await controller.findAll()).toEqual(userListPresenter);
      expect(listUsersUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const id = 'some-uuid';
      const updateDto: UpdateUserDto = { name: 'Jane Doe' };
      const updatedUser = new UserPresenter({
        id: 'some-uuid',
        name: 'Jane Doe',
        password: 'fake_password',
        email: 'jane.doe@example.com',
        status: UserStatus.Active,
        roles: UserRoles.User,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      jest
        .spyOn(updateUserUseCase, 'execute')
        .mockResolvedValueOnce(updatedUser);

      expect(await controller.update(id, updateDto)).toEqual(updatedUser);
      expect(updateUserUseCase.execute).toHaveBeenCalledWith({
        id,
        data: updateDto,
      });
    });
  });
});
