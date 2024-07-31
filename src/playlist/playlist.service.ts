import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { Repository } from 'typeorm';
import { Song } from '../song/entities/song.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private play_list_repositories: Repository<Playlist>,
    @InjectRepository(Song)
    private song_repositories: Repository<Song>,
    @InjectRepository(User)
    private user_repositories: Repository<User>,
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    const playlist = new Playlist();
    playlist.name = createPlaylistDto.name;
    const songs = await this.song_repositories.findByIds(
      createPlaylistDto.songs,
    );
    playlist.songs = songs;
    const user = await this.user_repositories.findOneBy({
      id: createPlaylistDto.user,
    });
    playlist.users = user;
    return this.play_list_repositories.save(playlist);
  }
}
