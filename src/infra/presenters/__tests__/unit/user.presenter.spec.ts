import { instanceToPlain } from 'class-transformer';
import { UserPresenter } from '../../user.presenter';
import { UserStatus } from '@/infra/interfaces/enums/status';
import { UserRoles } from '@/infra/interfaces/enums/roles';

describe('UserPresenter unit tests', () => {
  const createdAt = new Date();
  const updatedAt = new Date();
  const props = {
    id: 'e71c52a2-9710-4a96-a08e-144af4209b5d',
    name: 'test name',
    email: 'a@a.com',
    password: 'fake',
    roles: [UserRoles.User],
    status: UserStatus.Pending,
    updatedAt,
    createdAt,
  };
  let sut: UserPresenter;

  beforeEach(() => {
    sut = new UserPresenter(props);
  });

  describe('constructor', () => {
    it('should set values', () => {
      expect(sut.id).toEqual(props.id);
      expect(sut.name).toEqual(props.name);
      expect(sut.email).toEqual(props.email);
      expect(sut.createdAt).toEqual(props.createdAt);
      expect(sut.updatedAt).toEqual(props.updatedAt);
      expect(sut.roles).toEqual(props.roles);
      expect(sut.status).toEqual(props.status);
    });
  });

  it('should presenter data', () => {
    const output = instanceToPlain(sut);
    expect(output).toStrictEqual({
      id: 'e71c52a2-9710-4a96-a08e-144af4209b5d',
      name: 'test name',
      email: 'a@a.com',
      createdAt,
      updatedAt,
      roles: [UserRoles.User],
      status: UserStatus.Pending,
    });
  });
});

// Adicione seus testes para UserCollectionPresenter aqui
