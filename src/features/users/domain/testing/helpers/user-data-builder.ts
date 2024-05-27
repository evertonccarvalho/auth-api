import { UserProps } from '@/features/users/application/dtos/user-output';
import { UserRoles } from '@/shared/infra/database/typeorm/enums/roles';
import { UserStatus } from '@/shared/infra/database/typeorm/enums/status';
import { faker } from '@faker-js/faker';

type Props = {
  name?: string;
  email?: string;
  password?: string;
  roles?: UserRoles;
  status?: UserStatus;
  createdAt?: Date;
  updatedAt?: Date;
};

export function UserDataBuilder(props: Props): UserProps {
  return {
    name: props.name ?? faker.person.fullName(),
    email: props.email ?? faker.internet.email(),
    password: props.password ?? faker.internet.password(),
    roles: props.roles ?? faker.helpers.arrayElement(Object.values(UserRoles)),
    status:
      props.status ?? faker.helpers.arrayElement(Object.values(UserStatus)),
    createdAt: props.createdAt ?? new Date(),
    updatedAt: props.updatedAt ?? new Date(),
  };
}
