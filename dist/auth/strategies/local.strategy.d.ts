import { Strategy } from 'passport-local';
import { User } from 'src/user/schema/user.schema';
import { AuthService } from '../services/auth.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(username: string, password: string): Promise<User>;
}
export {};
