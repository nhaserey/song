import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Song } from '../../song/entities/song.entity';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'playlists' })
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Song, (song) => song.playliats)
  songs: Song[];

  @ManyToOne(() => User, (user) => user.playLists)
  users: User;
}
