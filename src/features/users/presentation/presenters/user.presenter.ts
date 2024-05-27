import { UserProps } from '@/features/users/application/dtos/user-output';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '../../../../shared/infra/database/typeorm/enums/roles';
import { UserStatus } from '../../../../shared/infra/database/typeorm/enums/status';

export class UserPresenter {
  @ApiProperty({ description: 'Identificação do usuário' })
  id: string;

  @ApiProperty({ description: 'Nome do usuário' })
  name: string;

  @ApiProperty({ description: 'E-mail do usuário' })
  email: string;

  @ApiProperty({ description: 'Status do usuário' })
  status: UserStatus;

  @ApiProperty({ description: 'Papéis do usuário' })
  roles: UserRoles;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.roles = props.roles;
    this.status = props.status;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
