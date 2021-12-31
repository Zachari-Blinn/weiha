import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { Provider } from './constants/provider.enum';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  googleLogin(req) {
    if (!req.user) {
      return 'No user found from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  async validateOAuthLogin(req): Promise<string> {
    try {
      let user = await this.usersService.findOneByThirdPartyId(
        req.user.providerId,
        req.user.provider,
      );

      if (!user) {
        user = await this.usersService.registerOAuthUser({
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          email: req.user.email,
          username: req.user.username,
          providerId: req.user.providerId,
          provider: req.user.provider,
        });
      }

      const payload = {
        providerId: req.user.providerId,
        provider: req.user.provider,
      };

      const jwt: string = sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      return jwt;
    } catch (error) {
      throw new InternalServerErrorException('validateOAuthLogin', error.message);
    }
  }
}
