import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LogginAuthDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'Meng@gmial.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: '12345678',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
