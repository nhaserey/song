import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepositories: Repository<Artist>,
    @InjectRepository(User)
    private userRepositories: Repository<User>,
  ) {}
  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const { userId } = createArtistDto;
    const user = await this.userRepositories.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const newArtist = this.artistRepositories.create({
      user,
    });
    return await this.artistRepositories.save(newArtist);
  }

  findArtist(userId: number): Promise<Artist> {
    return this.artistRepositories.findOneBy({ user: { id: userId } });
  }
}
