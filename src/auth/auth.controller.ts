import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { LogginAuthDto } from './dto/loggin-auth.dto';
import { ApiTags } from '@nestjs/swagger';

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
}
