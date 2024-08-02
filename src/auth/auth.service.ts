import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { LogginAuthDto } from './dto/loggin-auth.dto';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { ArtistService } from 'src/artist/artist.service';
import type { Enable2FAType, PayloadType } from './dto/type';
import * as speakeasy from 'speakeasy';
import type { UpdateResult } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private artistsService: ArtistService,
  ) {}

  async singUp(signUpDto: SignUpAuthDto): Promise<User> {
    const user = await this.userService.create(signUpDto);
    const userExists = await this.userService.findOne(user);
    if (userExists) {
      throw new BadRequestException('User already exists!');
    }
    return userExists;
  }

  async loggin(logginDto: LogginAuthDto): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(logginDto);
    const passwordMatched = await bcrypt.compare(
      logginDto.password,
      user.password,
    );
    if (passwordMatched) {
      delete user.password;
      const payload: PayloadType = { email: user.email, userId: user.id };
      const artist = await this.artistsService.findArtist(user.id);
      if (artist) {
        payload.artistId = artist.id;
      }

      return {
        accessToken: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException('Password does not match');
    }
  }

  async enable2FA(userId: number): Promise<Enable2FAType> {
    const user = await this.userService.findById(userId);
    if (user.enable2FA) {
      return { secret: user.twoFASecret };
    }
    const secret = speakeasy.generateSecret();
    user.twoFASecret = secret.base32;
    await this.userService.updateSecretKey(user.id, user.twoFASecret);
    return { secret: user.twoFASecret };
  }

  async validate2FAToken(
    userId: number,
    token: string,
  ): Promise<{ verified: boolean }> {
    try {
      const user = await this.userService.findById(userId);

      const verified = speakeasy.totp.verify({
        secret: user.twoFASecret,
        token: token,
        encoding: 'base32',
      });

      if (verified) {
        return { verified: true };
      } else {
        return { verified: false };
      }
    } catch (err) {
      throw new UnauthorizedException('Error verifying token');
    }
  }

  async disable2FA(userId: number): Promise<UpdateResult> {
    return this.userService.disable2FA(userId);
  }

  async validateToken(token: string) {
    return await this.jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  async validateUserByApiKey(apiKey: string): Promise<User> {
    return this.userService.findByApiKey(apiKey);
  }
}
