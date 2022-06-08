import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { hash, compare } from 'bcryptjs';
import { RegisterUserDto } from '../dto/register.dto';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(registrationData: RegisterUserDto, user: User) {
    const hashedPassword = await this.hashPassword(registrationData.password);

    try {
      return this.userService.createOne(
        {
          ...registrationData,
          password: hashedPassword,
        },
        user,
      );
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getAuthenticatedUser(username: string, plainTextPassword: string) {
    try {
      const user = await this.userService.findOne(username);
      await this.verifyPassword(true, plainTextPassword, user.password);
      return user;
    } catch (error) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  async verifyPassword(
    samePassword: boolean,
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await compare(plainTextPassword, hashedPassword);
    console.log(isPasswordMatching);
    if (!isPasswordMatching && samePassword) {
      throw new BadRequestException('Wrong credentials provided');
    }
    if (isPasswordMatching && !samePassword) {
      throw new BadRequestException('Same password than before');
    }
  }
  async hashPassword(password: string) {
    const hashedPassword = await hash(password, 10);
    return hashedPassword;
  }
}
