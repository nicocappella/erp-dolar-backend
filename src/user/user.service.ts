import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare } from 'bcryptjs';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findOne(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).exec();

    if (user) {
      return user;
    }
    throw new NotFoundException('User not found');
  }
  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (user) {
      return user;
    }
    throw new NotFoundException('User not found');
  }
  async createOne(createUserDto: CreateUserDto): Promise<User> {
    const createUser = new this.userModel(createUserDto);
    await createUser.save();

    return createUser;
  }

  async deleteOne(id: string): Promise<User> {
    return this.userModel.findOneAndDelete({ _id: id }).exec();
  }
}
