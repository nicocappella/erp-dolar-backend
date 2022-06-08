import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Public } from 'src/public-route';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteOne(id);
  }
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateOne(id, updateUserDto);
  }

  @Patch('tag/:id')
  async addRole(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.addOrRemoveRoleToUser(id, updateUserDto, true);
  }

  @Delete('tag/:id')
  async removeRole(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.addOrRemoveRoleToUser(id, updateUserDto, false);
  }
}
