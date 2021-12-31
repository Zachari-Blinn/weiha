import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import User from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateOAuthLogin(req): Promise<string> {
    try {
      let user: User = await this.usersService.findOneByThirdPartyId(
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

      const payload: JwtPayload = {
        providerId: req.user.providerId,
        provider: req.user.provider,
      };

      const jwt: string = this.jwtService.sign(payload);

      return jwt;
    } catch (error) {
      throw new InternalServerErrorException('validateOAuthLogin', error.message);
    }
  }
}
