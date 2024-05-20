import { BaseEntity } from '../entities/entity';
import { UserProps } from '@/infra/entities/user.entity';
import { Role } from '@/infra/interfaces/enums/roles';
import { UserStatus } from '@/infra/interfaces/enums/status';

export class UserModel extends BaseEntity<UserProps> {
  id: string;
  name: string;
  email: string;
  password: string;
  status: UserStatus;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;

  constructor(props: UserProps, id: string) {
    super(props, id); // Chame o construtor da BaseEntity com props

    // Atribua os campos diretamente
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

  // Métodos da classe UserModel, se houver...
}
