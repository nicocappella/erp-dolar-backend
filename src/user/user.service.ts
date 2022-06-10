import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/services/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {}

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
  async createOne(createUserDto: CreateUserDto, user: User): Promise<User> {
    // if (user.roles.find((d) => d === 'admin')) {
    const createUser = new this.userModel(createUserDto);
    await createUser.save();
    return createUser;
    // }
    // return null;
  }
  async updateOne(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.username && !updateUserDto.password) {
      const existingUser = await this.userModel.findOne({
        username: updateUserDto.username,
      });
      if (existingUser) {
        throw new BadRequestException('User already in use');
      }
      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .exec();
      return updatedUser;
    }
    if (updateUserDto.password && !updateUserDto.username) {
      const { password } = await this.userModel.findById(id);
      await this.authService.verifyPassword(
        false,
        updateUserDto.password,
        password,
      );
      const hashPassword = await this.authService.hashPassword(
        updateUserDto.password,
      );
      const updatedUser = await this.userModel
        .findByIdAndUpdate(
          id,
          { $set: { password: hashPassword } },
          { new: true },
        )
        .exec();
      return updatedUser;
    }
  }
  async addOrRemoveRoleToUser(
    id: string,
    updateUserDto: UpdateUserDto,
    add: boolean,
  ) {
    const addOrRemove = add ? '$addToSet' : '$pullAll';
    const updatedUser = this.userModel.findByIdAndUpdate(
      id,
      {
        [addOrRemove]: { roles: updateUserDto.roles },
      },
      { new: true },
    );
    if (!updateUserDto) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async deleteOne(id: string): Promise<User> {
    return this.userModel.findOneAndDelete({ _id: id }).exec();
  }
}
