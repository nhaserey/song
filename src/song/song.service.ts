import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Artist } from '../artist/entities/artist.entity';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song)
    private songRepositories: Repository<Song>,
    @InjectRepository(Artist)
    private artistRepositories: Repository<Artist>,
  ) {}

  async create(createSongDto: CreateSongDto): Promise<Song> {
    const { title, releasedDate, lyrice, duration, artistIds } = createSongDto;
    const song = new Song();
    song.title = title;
    song.releasedDate = releasedDate;
    song.duration = duration;
    song.lyrics = lyrice;
    let artists: Artist[] = [];
    if (artistIds && Array.isArray(artistIds)) {
      artists = await this.artistRepositories.findByIds(artistIds);
      if (artists.length !== artistIds.length) {
        throw new NotFoundException('One or more artist IDs are invalid');
      }
    } else {
      throw new NotFoundException('Invalid artist IDs provided');
    }

    song.artists = artists;

    return this.songRepositories.save(song);
  }

  async paginate(option: IPaginationOptions): Promise<Pagination<Song>> {
    const query = this.songRepositories.createQueryBuilder('c');
    query.orderBy('c.releasedDate', 'DESC');
    return paginate<Song>(query, option);
  }

  findAll(): Promise<Song[]> {
    return this.songRepositories.find();
  }

  findOne(id: number): Promise<Song> {
    return this.songRepositories.findOneBy({ id });
  }

  update(id: number, updateSongDto: UpdateSongDto): Promise<UpdateResult> {
    return this.songRepositories.update(id, updateSongDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.songRepositories.delete(id);
  }
}
