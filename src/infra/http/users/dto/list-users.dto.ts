// user-list.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../entities/user.entity';

export class ListUsersDto {
  @ApiProperty({ description: 'Identificador único do usuário' })
  id: string;

  @ApiProperty({ description: 'Nome completo do usuário' })
  name: string;

  @ApiProperty({ description: 'Endereço de email do usuário' })
  email: string;

  @ApiProperty({
    description: 'Número de telefone do usuário',
    required: false,
  })
  phoneNumber?: string;

  @ApiProperty({ description: 'Indica se o usuário está ativo', default: true })
  isActive: boolean;

  @ApiProperty({
    description: 'Indica se o usuário é um administrador',
    default: false,
  })
  admin: boolean;

  @ApiProperty({ description: 'Data e hora de criação do usuário' })
  createdAt: Date;

  @ApiProperty({ description: 'Data e hora da última atualização do usuário' })
  updatedAt: Date;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
