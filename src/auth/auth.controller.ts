import { Controller, Delete, Post, Request, UseGuards } from '@nestjs/common';

import { Public } from 'src/public-route';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Delete('logout')
  async logout(@Request() req) {
    try {
      if (req.session) {
        return req.session.destroy();
      }
      return req.end();
    } catch (e) {
      throw new Error(e);
    }
  }
}
