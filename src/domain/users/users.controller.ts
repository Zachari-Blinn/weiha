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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return NotImplementedException;
  }

  @Get()
  findAll() {
    return NotImplementedException;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return NotImplementedException;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return NotImplementedException;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return NotImplementedException;
  }
}
