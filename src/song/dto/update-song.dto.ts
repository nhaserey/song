import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateSongDto {
  @ApiPropertyOptional({ description: 'The title of the song' })
  @IsString()
  @IsOptional()
  readonly title;

  @ApiPropertyOptional({ description: 'List of artists', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly artists;

  @ApiPropertyOptional({ description: 'Lyrics of the song' })
  @IsString()
  @IsOptional()
  readonly lyrice: string;

  @ApiPropertyOptional({ description: 'Release date of the song' })
  @IsOptional()
  @IsDateString()
  readonly releasedDate: Date;

  @ApiPropertyOptional({
    description: 'Duration of the song in HH:mm:ss format',
  })
  @IsOptional()
  @IsMilitaryTime()
  readonly duration: Date;
}
