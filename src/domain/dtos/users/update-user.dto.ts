import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The full name of the user.',
    example: 'John Doe',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  name?: string;
}
