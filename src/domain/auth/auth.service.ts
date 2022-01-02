import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import User from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { Provider } from './constants/provider.enum';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateOAuthLogin(req): Promise<string> {
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
        userId: user.id,
        providerId: req.user.providerId,
        provider: req.user.provider,
      };

      const jwt: string = this.jwtService.sign(payload);

      return jwt;
    } catch (error) {
      throw new InternalServerErrorException('validateOAuthLogin', error.message);
    }
  }

  public async validateLocalUser(username: string, providedPassword: string): Promise<User> {
    try {
      //check if username and password are provided
      if (!username || !providedPassword) {
        throw new BadRequestException('Username and password are required');
      }
      const user: User = await this.usersService.findOneByCriteria({
        username,
      });
      if (user && user.password && (await bcrypt.compare(providedPassword, user.password))) {
        console.log('user found');
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      throw new InternalServerErrorException('validateLocalUser', error.message);
    }
  }

  public async login(user: User): Promise<any> {
    const payload: JwtPayload = {
      userId: user.id,
      providerId: null,
      provider: Provider.LOCAL,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
