import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Public } from 'src/public-route';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Get(':id')
  async getUser(@Param('username') username: string) {
    return this.userService.findOne(username);
  }
  @Public()
  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createOne(createUserDto);
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteOne(id);
  }
}
