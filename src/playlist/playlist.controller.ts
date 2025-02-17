import { Controller, Post, Body } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { Playlist } from './entities/playlist.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('PlayList')
@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    return this.playlistService.create(createPlaylistDto);
  }
}
