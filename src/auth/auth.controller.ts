import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { LogginAuthDto } from './dto/loggin-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from './guards/jwt-guard';
import type { Enable2FAType } from './dto/type';
import type { UpdateResult } from 'typeorm';
import type { ValidateTokenDto } from './dto/validate-token.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  singup(@Body() signUpAuthDto: SignUpAuthDto) {
    return this.authService.singUp(signUpAuthDto);
  }

  @Post('/loggin')
  loggin(@Body() logginAuthDto: LogginAuthDto) {
    return this.authService.loggin(logginAuthDto);
  }

  @Get('enable-2fa')
  @UseGuards(JwtGuard)
  enable2FA(
    @Request()
    req,
  ): Promise<Enable2FAType> {
    console.log(req.user);
    return this.authService.enable2FA(req.user.userId);
  }

  @Post('validate-2fa')
  @UseGuards(JwtGuard)
  validate2FA(
    @Request()
    req,
    @Body()
    ValidateTokenDTO: ValidateTokenDto,
  ): Promise<{ verified: boolean }> {
    return this.authService.validate2FAToken(
      req.user.userId,
      ValidateTokenDTO.token,
    );
  }
  @Get('disable-2fa')
  @UseGuards(JwtGuard)
  disable2FA(
    @Request()
    req,
  ): Promise<UpdateResult> {
    return this.authService.disable2FA(req.user.userId);
  }
  @Get('profile')
  @UseGuards(AuthGuard('bearer'))
  getProfile(
    @Request()
    req,
  ) {
    delete req.user.password;
    return {
      msg: 'authenticated with api key',
      user: req.user,
    };
  }
}
