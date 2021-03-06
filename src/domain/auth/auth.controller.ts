import { Controller, Get, Post, Req, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {
    // Guard will redirect to google login page
  }

  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleLoginCallback(@Request() req) {
    return this.authService.validateOAuthLogin(req);
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  protectedResource() {
    return 'JWT is working!';
  }
}
