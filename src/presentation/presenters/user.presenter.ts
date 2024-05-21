import { ApiProperty } from '@nestjs/swagger';
import { UserOutput } from '../../domain/dtos/users';
import { UserRoles } from '../../domain/interfaces/enums/roles';
import { UserStatus } from '../../domain/interfaces/enums/status';

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
  roles: UserRoles[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(props: UserOutput) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.roles = props.roles;
    this.status = props.status;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
