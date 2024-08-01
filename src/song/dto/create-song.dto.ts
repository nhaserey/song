import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
    IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateSongDto {
  @ApiProperty({ description: 'The title of the song' , example: 'What is your Name'})
  @IsString()
  @IsNotEmpty()
  readonly title;

  @ApiProperty({ description: 'List of artist IDs associated with the song', type: [Number] , example: [1]})
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly artistIds: number[];

  @ApiPropertyOptional({ description: 'Lyrics of the song' , example: 'Test'})
  @IsString()
  @IsOptional()
  readonly lyrice: string;

  @ApiProperty({ description: 'Release date of the song' , example: '2024-07-20'})
  @IsNotEmpty()
  @IsDateString()
  readonly releasedDate: Date;

  @ApiProperty({ description: 'Duration of the song in HH:mm:ss format' , example: '03:45'})
  @IsNotEmpty()
  @IsMilitaryTime()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Duration must be in the format HH:MM',
  })
  readonly duration: Date;
}
