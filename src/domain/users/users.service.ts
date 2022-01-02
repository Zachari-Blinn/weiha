import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from '../auth/constants/provider.enum';
import StripeService from '../stripe/stripe.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterOAuthUserDto } from './dto/register-oauth-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './user.entity';
import * as bcrypt from 'bcrypt';

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
    //check if user already exists
    const user = await this.findOneByCriteria({
      email: userData.email,
    });
    if (user) {
      throw new ConflictException('User already exists');
    }
    const stripeCustomer = await this.stripeService.createCustomer(
      userData.username,
      userData.email,
    );
    return this.userRepository.save({
      ...userData,
      stripeCustomerId: stripeCustomer.id,
    });
  }

  public async registerLocalUser(userData: CreateUserDto): Promise<User> {
    //check if user already exists
    const user = await this.findOneByCriteria({
      email: userData.email,
    });
    if (user) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await this.hashPassword(userData.password);
    const stripeCustomer = await this.stripeService.createCustomer(
      userData.username,
      userData.email,
    );
    let createdUser = await this.userRepository.save({
      ...userData,
      stripeCustomerId: stripeCustomer.id,
      password: hashedPassword,
    });
    // remove password field from createdUser
    const { password, ...result } = createdUser;

    return result;
  }

  public async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  public async findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  public async findByCriteria(criteria: Partial<User>): Promise<User[]> {
    return this.userRepository.find(criteria);
  }

  public async findOneByCriteria(criteria: Partial<User>): Promise<User> {
    return this.userRepository.findOne(criteria);
  }
}
