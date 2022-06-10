import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from '../dto/register.dto';
import { User } from 'src/user/schema/user.schema';
export declare class AuthService {
    private userService;
    constructor(userService: UserService);
    register(registrationData: RegisterUserDto, user: User): Promise<User>;
    getAuthenticatedUser(username: string, plainTextPassword: string): Promise<User>;
    verifyPassword(samePassword: boolean, plainTextPassword: string, hashedPassword: string): Promise<void>;
    hashPassword(password: string): Promise<string>;
}
