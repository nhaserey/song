import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlaylistDto {
  @ApiProperty({ description: 'Name of the playlist' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'List of song IDs', type: [Number] })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly songs: number[];

  @ApiProperty({ description: 'ID of the user who owns the playlist' })
  @IsNumber()
  @IsNotEmpty()
  readonly user: number;
}
