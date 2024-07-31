import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Playlist } from '../../playlist/entities/playlist.entity';
import { Artist } from '../../artist/entities/artist.entity';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // @Column('varchar', { array: true })
  // artists: string[];

  @Column('date')
  releasedDate: Date;

  @Column('time')
  duration: Date;

  @Column('text')
  lyrics: string;

  @ManyToOne(() => Playlist, (playlist) => playlist.users)
  playliats: Playlist;

  @ManyToMany(() => Artist, (artist) => artist.song, { cascade: true })
  @JoinColumn({ name: 'song_artists' })
  artists: Artist[];
}
