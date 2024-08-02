import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateTokenDto {
  @ApiProperty({
    description: 'token',
  })
  @IsNotEmpty()
  @IsString()
  token: string;
}
