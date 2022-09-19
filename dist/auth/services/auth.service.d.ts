import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from '../dto/register.dto';
import { User } from 'src/user/schema/user.schema';
import { Request } from 'express';
interface RequestUser extends Request {
    user: User;
}
export declare class AuthService {
    private userService;
    constructor(userService: UserService);
    register(registrationData: RegisterUserDto, request: RequestUser): Promise<User>;
    getAuthenticatedUser(username: string, plainTextPassword: string): Promise<User>;
    verifyPassword(samePassword: boolean, plainTextPassword: string, hashedPassword: string): Promise<void>;
    hashPassword(password: string): Promise<string>;
}
export {};
