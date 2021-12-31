import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from '../auth/constants/provider.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterOAuthUserDto } from './dto/register-oauth-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  public findOneByThirdPartyId(thirdPartyId: string, provider: Provider): Promise<User> {
    return this.userRepository.findOne({
      where: {
        providerId: thirdPartyId,
        provider,
      },
    });
  }

  public registerOAuthUser(registerOAuthUserDto: RegisterOAuthUserDto): Promise<User> {
    return this.userRepository.save(registerOAuthUserDto);
  }
}
