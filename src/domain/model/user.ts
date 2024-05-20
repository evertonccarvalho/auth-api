// user.model.ts
import { BaseEntity } from '../entities/entity';
import { UserEntity, UserProps } from '@/infra/entities/user.entity';
import { Role } from '@/infra/utils/enums/roles';
import { UserStatus } from '@/infra/utils/enums/status';

export class UserModel extends BaseEntity<UserProps> {
  id: string; // Utilizando 'id' ao invés de '_id'
  name: string;
  email: string;
  password: string;
  status: UserStatus;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;

  constructor(props: UserEntity) {
    super(props.props, props.id); // Passando props.props para BaseEntity e props.id para o id

    // Atribuição direta dos campos
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.status = props.status;
    this.roles = props.roles;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;

    // Se precisar, pode usar Object.assign para atribuir props adicionais
    Object.assign(this, props);
  }
}
