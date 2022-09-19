import { AuthService } from 'src/auth/services/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    getUsers(): Promise<User[]>;
    getUser(id: string): Promise<User>;
    createUser(createUserDto: CreateUserDto, req: any): Promise<User>;
    updateUser(id: string, updateUserDto: UpdateUserDto, req: any): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updatePassword(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    addOrRemoveRole(id: string, updateUserDto: UpdateUserDto): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteUser(id: string): Promise<User>;
    removeRole(id: string, updateUserDto: UpdateUserDto): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
