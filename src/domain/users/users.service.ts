import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from '../auth/constants/provider.enum';
import StripeService from '../stripe/stripe.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterOAuthUserDto } from './dto/register-oauth-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly stripeService: StripeService,
  ) {}

  public findOneByThirdPartyId(thirdPartyId: string, provider: Provider): Promise<User> {
    return this.userRepository.findOne({
      where: {
        providerId: thirdPartyId,
        provider,
      },
    });
  }

  public async registerOAuthUser(userData: RegisterOAuthUserDto): Promise<User> {
    const stripeCustomer = await this.stripeService.createCustomer(
      userData.username,
      userData.email,
    );
    const newUser = await this.userRepository.save({
      ...userData,
      stripeCustomerId: stripeCustomer.id,
    });
    return this.userRepository.save(newUser);
  }
}
