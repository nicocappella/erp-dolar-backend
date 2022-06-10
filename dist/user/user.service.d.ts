import { Model } from 'mongoose';
import { AuthService } from 'src/auth/services/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';
export declare class UserService {
    private userModel;
    private authService;
    constructor(userModel: Model<UserDocument>, authService: AuthService);
    findAll(): Promise<User[]>;
    findOne(username: string): Promise<User>;
    findById(id: string): Promise<User>;
    createOne(createUserDto: CreateUserDto, user: User): Promise<User>;
    updateOne(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    addOrRemoveRoleToUser(id: string, updateUserDto: UpdateUserDto, add: boolean): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    deleteOne(id: string): Promise<User>;
}
