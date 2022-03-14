import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';

export class SessionSerializer extends PassportSerializer {
  constructor(@Inject(UserService) private readonly userService: UserService) {
    super();
  }

  serializeUser(user: User, done: (err, user: User) => void) {
    done(null, user);
  }
  async deserializeUser(user: User, done: (err, user: User) => void) {
    const userDB = await this.userService.findById(user._id);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
