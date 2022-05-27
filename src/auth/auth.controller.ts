import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from 'src/public-route';
import { RegisterUserDto } from './dto/register.dto';
import { CookieAuthenticationGuard } from './guards/cookie-authentication.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './services/auth.service';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';

@Controller('auth')
@UseInterceptors(new SanitizeMongooseModelInterceptor())
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async createUser(@Body() registerUserDto: RegisterUserDto, @Request() req) {
    return this.authService.register(registerUserDto, req.user);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  @UseGuards(CookieAuthenticationGuard)
  @Get()
  async authenticate(@Request() req) {
    return req.user;
  }

  @UseGuards(CookieAuthenticationGuard)
  @Post('logout')
  async logout(@Request() req) {
    req.session.destroy();
  }
}
