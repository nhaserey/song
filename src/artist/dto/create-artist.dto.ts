import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({
    description: 'ID of the user associated with the artist',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;
}
