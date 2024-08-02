import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuid4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { LogginAuthDto } from 'src/auth/dto/loggin-auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepositories: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.apiKey = uuid4();

    const salt = await bcrypt.genSalt();
    user.password = bcrypt.hashSync(createUserDto.password, salt);

    const savedUser = await this.userRepositories.save(user);
    delete savedUser.password;
    return savedUser;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(data: LogginAuthDto): Promise<User> {
    const user = await this.userRepositories.findOneBy({ email: data.email });
    if (!user) {
      throw new UnauthorizedException('Could not find user');
    }
    return user;
  }

  async findByApiKey(apiKey: string): Promise<User> {
    return this.userRepositories.findOneBy({ apiKey });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
