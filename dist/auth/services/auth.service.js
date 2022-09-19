"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../user/user.service");
const bcryptjs_1 = require("bcryptjs");
let AuthService = class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    async register(registrationData, request) {
        const hashedPassword = await this.hashPassword(registrationData.password);
        try {
            if (request.originalUrl === '/auth/signup' ||
                request.user.roles.find((d) => d === 'admin')) {
                return this.userService.createOne(Object.assign(Object.assign({}, registrationData), { password: hashedPassword }));
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Something went wrong');
        }
    }
    async getAuthenticatedUser(username, plainTextPassword) {
        try {
            const user = await this.userService.findOne(username);
            await this.verifyPassword(true, plainTextPassword, user.password);
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException('Wrong credentials provided');
        }
    }
    async verifyPassword(samePassword, plainTextPassword, hashedPassword) {
        const isPasswordMatching = await (0, bcryptjs_1.compare)(plainTextPassword, hashedPassword);
        if (!isPasswordMatching && samePassword) {
            throw new common_1.BadRequestException('Wrong credentials provided');
        }
        if (isPasswordMatching && !samePassword) {
            throw new common_1.BadRequestException('Same password provided');
        }
    }
    async hashPassword(password) {
        const hashedPassword = await (0, bcryptjs_1.hash)(password, 10);
        return hashedPassword;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map