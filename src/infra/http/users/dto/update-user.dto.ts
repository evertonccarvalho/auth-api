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
  readonly name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The phone number of the user.',
    example: '88 x xxxx xxxx',
    required: false,
    type: String,
    format: 'phone number',
  })
  readonly phoneNumber?: string;
}
