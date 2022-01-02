import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotImplementedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterLocalUserDto } from './dto/register-local-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return NotImplementedException;
  }

  @Get()
  findAll() {
    return this.usersService.findByCriteria(null);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return NotImplementedException;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return NotImplementedException;
  }

  @Post('/register')
  registerLocalUser(@Body() registerLocalUser: RegisterLocalUserDto) {
    return this.usersService.registerLocalUser(registerLocalUser);
  }
}
