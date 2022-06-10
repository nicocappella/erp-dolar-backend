import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUsers(): Promise<User[]>;
    getUser(username: string): Promise<User>;
    deleteUser(id: string): Promise<User>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    addRole(id: string, updateUserDto: UpdateUserDto): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    removeRole(id: string, updateUserDto: UpdateUserDto): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
