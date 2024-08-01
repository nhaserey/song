import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { Playlist } from '../../playlist/entities/playlist.entity';
import { Artist } from '../../artist/entities/artist.entity';
import { Song } from '../../song/entities/song.entity';

export const TypeOrmConfig = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('POSTGRES_HOST'),
    port: configService.get<number>('POSTGRES_PORT'),
    username: configService.get<string>('POSTGRES_USER'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    database: configService.get<string>('POSTGRES_DB_NAME'),
    entities: [User, Playlist, Artist, Song],
    synchronize: true,
  }),
  inject: [ConfigService],
});
