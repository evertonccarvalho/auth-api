import { UserEntity } from '../../domain/entities/user';
import { UserOutputMapper, UserProps } from './user-output';

describe('UserOutputMapper', () => {
  it('deve mapear corretamente um UserModel para UserOutput', () => {
    const entity = new UserEntity({
      id: '0441c283-910c-4624-96ea-2453ec1a93d6',
      name: 'user',
      email: '123123a@email.com',
      roles: 'User' as any,
      status: 'Pending' as any,
      createdAt: new Date('2024-05-27T00:12:11.443Z'),
      updatedAt: new Date('2024-05-27T00:12:11.443Z'),
    });
    const userOutput: UserProps = UserOutputMapper.toOutput(entity);
    // expect(userOutput.id).toBe(entity.id);
    expect(userOutput.name).toBe(entity.name);
    expect(userOutput.email).toBe(entity.email);
    expect(userOutput.roles).toBe(entity.roles);
    expect(userOutput.status).toBe(entity.status);
    expect(userOutput.createdAt).toEqual(entity.createdAt);
    expect(userOutput.updatedAt).toEqual(entity.updatedAt);
  });
});
