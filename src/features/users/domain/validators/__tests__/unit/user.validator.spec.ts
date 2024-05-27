import { UserProps } from '@/features/users/application/dtos/user-output';
import { UserDataBuilder } from '../../../testing/helpers/user-data-builder';
import {
  UserRules,
  UserValidator,
  UserValidatorFactory,
} from '../../user.validator';

let sut: UserValidator;
let props: UserProps;

describe('UserValidator unit tests', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create();
    props = UserDataBuilder({});
  });

  it('Invalidation cases for name field', () => {
    let isValid = sut.validate(null as any);
    expect(isValid).toBeFalsy();
    expect(sut.errors['name']).toStrictEqual([
      'name should not be empty',
      'name must be a string',
      'name must be shorter than or equal to 255 characters',
    ]);

    isValid = sut.validate({ ...props, name: '' });
    expect(isValid).toBeFalsy();
    expect(sut.errors['name']).toStrictEqual(['name should not be empty']);

    isValid = sut.validate({ ...props, name: 10 as any });
    expect(isValid).toBeFalsy();
    expect(sut.errors['name']).toStrictEqual([
      'name must be a string',
      'name must be shorter than or equal to 255 characters',
    ]);

    isValid = sut.validate({ ...props, name: 'a'.repeat(256) });
    expect(isValid).toBeFalsy();
    expect(sut.errors['name']).toStrictEqual([
      'name must be shorter than or equal to 255 characters',
    ]);
  });

  it('Invalidation cases for email field', () => {
    let isValid = sut.validate(null as any);
    expect(isValid).toBeFalsy();
    expect(sut.errors['email']).toStrictEqual([
      'email should not be empty',
      'email must be an email',
      'email must be a string',
      'email must be shorter than or equal to 255 characters',
    ]);

    isValid = sut.validate({ ...props, email: '' });
    expect(isValid).toBeFalsy();
    expect(sut.errors['email']).toStrictEqual([
      'email should not be empty',
      'email must be an email',
    ]);

    isValid = sut.validate({ ...props, email: 10 as any });
    expect(isValid).toBeFalsy();
    expect(sut.errors['email']).toStrictEqual([
      'email must be an email',
      'email must be a string',
      'email must be shorter than or equal to 255 characters',
    ]);

    isValid = sut.validate({ ...props, email: 'a'.repeat(256) });
    expect(isValid).toBeFalsy();
    expect(sut.errors['email']).toStrictEqual([
      'email must be an email',
      'email must be shorter than or equal to 255 characters',
    ]);
  });

  it('Invalidation cases for password field', () => {
    let isValid = sut.validate(null as any);
    expect(isValid).toBeFalsy();
    expect(sut.errors['password']).toStrictEqual([
      'password should not be empty',
      'password must be a string',
      'password must be shorter than or equal to 100 characters',
    ]);

    isValid = sut.validate({ ...props, password: '' });
    expect(isValid).toBeFalsy();
    expect(sut.errors['password']).toStrictEqual([
      'password should not be empty',
    ]);

    isValid = sut.validate({ ...props, password: 10 as any });
    expect(isValid).toBeFalsy();
    expect(sut.errors['password']).toStrictEqual([
      'password must be a string',
      'password must be shorter than or equal to 100 characters',
    ]);

    isValid = sut.validate({ ...props, password: 'a'.repeat(256) });
    expect(isValid).toBeFalsy();
    expect(sut.errors['password']).toStrictEqual([
      'password must be shorter than or equal to 100 characters',
    ]);
  });

  it('Invalidation cases for roles field', () => {
    let isValid = sut.validate({ ...props, roles: 10 as any });
    expect(isValid).toBeFalsy();
    expect(sut.errors['roles']).toStrictEqual([
      'roles must be one of the following values: user, admin',
    ]);

    isValid = sut.validate({ ...props, roles: 'invalidRole' as any });
    expect(isValid).toBeFalsy();
    expect(sut.errors['roles']).toStrictEqual([
      'roles must be one of the following values: user, admin',
    ]);
  });

  it('Invalidation cases for status field', () => {
    let isValid = sut.validate({ ...props, status: 10 as any });
    expect(isValid).toBeFalsy();
    expect(sut.errors['status']).toStrictEqual([
      'status must be one of the following values: active, inactive, pending',
    ]);

    isValid = sut.validate({ ...props, status: 'invalidRole' as any });
    expect(isValid).toBeFalsy();
    expect(sut.errors['status']).toStrictEqual([
      'status must be one of the following values: active, inactive, pending',
    ]);
  });

  it('Invalidation cases for createdAt field', () => {
    let isValid = sut.validate({ ...props, createdAt: 10 as any });
    expect(isValid).toBeFalsy();
    expect(sut.errors['createdAt']).toStrictEqual([
      'createdAt must be a Date instance',
    ]);

    isValid = sut.validate({ ...props, createdAt: '2023' as any });
    expect(isValid).toBeFalsy();
    expect(sut.errors['createdAt']).toStrictEqual([
      'createdAt must be a Date instance',
    ]);
  });

  it('Invalidation cases for updatedAt field', () => {
    let isValid = sut.validate({ ...props, updatedAt: 10 as any });
    expect(isValid).toBeFalsy();
    expect(sut.errors['updatedAt']).toStrictEqual([
      'updatedAt must be a Date instance',
    ]);

    isValid = sut.validate({ ...props, updatedAt: '2023' as any });
    expect(isValid).toBeFalsy();
    expect(sut.errors['updatedAt']).toStrictEqual([
      'updatedAt must be a Date instance',
    ]);
  });

  it('Valid case for user rules', () => {
    const isValid = sut.validate(props);
    expect(isValid).toBeTruthy();
    console.log(sut.validatedData);
    expect(sut.validatedData).toStrictEqual(new UserRules(props));
  });
});
