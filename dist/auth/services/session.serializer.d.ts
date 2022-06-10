import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
export declare class SessionSerializer extends PassportSerializer {
    private readonly userService;
    constructor(userService: UserService);
    serializeUser(user: User, done: (err: any, user: User) => void): void;
    deserializeUser(user: User, done: (err: any, user: User) => void): Promise<void>;
}
