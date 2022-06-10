import { RegisterUserDto } from './dto/register.dto';
import { AuthService } from './services/auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    createUser(registerUserDto: RegisterUserDto, req: any): Promise<import("../user/schema/user.schema").User>;
    login(req: any): Promise<any>;
    authenticate(req: any): Promise<any>;
    logout(req: any): Promise<void>;
}
