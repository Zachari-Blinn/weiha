import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Provider } from './constants/provider.enum';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    // Guard will redirect to google login page
  }

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req) {
    return this.authService.validateOAuthLogin(req);
  }
}
