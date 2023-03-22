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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const auth_service_1 = require("../auth/services/auth.service");
const user_schema_1 = require("./schema/user.schema");
let UserService = class UserService {
    constructor(userModel, authService) {
        this.userModel = userModel;
        this.authService = authService;
    }
    async findAll() {
        return this.userModel.find().select('-password').exec();
    }
    async findOne(username) {
        const user = await this.userModel.findOne({ username }).exec();
        if (user) {
            return user;
        }
        throw new common_1.NotFoundException('User not found');
    }
    async findById(id) {
        const user = await this.userModel.findById(id).exec();
        if (user) {
            return user;
        }
        throw new common_1.NotFoundException('User not found');
    }
    async createOne(createUserDto) {
        const createUser = new this.userModel(createUserDto);
        await createUser.save();
        return createUser;
    }
    async updatePassword(id, updateUserDto) {
        if (updateUserDto.username && !updateUserDto.password) {
            const existingUser = await this.userModel.findOne({
                username: updateUserDto.username,
            });
            if (existingUser) {
                throw new common_1.BadRequestException('User already in use');
            }
            const updatedUser = await this.userModel
                .findByIdAndUpdate(id, updateUserDto, { new: true })
                .exec();
            return updatedUser;
        }
        if (updateUserDto.password && !updateUserDto.username) {
            const { password } = await this.userModel.findById(id);
            await this.authService.verifyPassword(false, updateUserDto.password, password);
            const hashPassword = await this.authService.hashPassword(updateUserDto.password);
            const updatedUser = await this.userModel
                .findByIdAndUpdate(id, { $set: { password: hashPassword } }, { new: true })
                .exec();
            return updatedUser;
        }
    }
    async addOrRemoveRoleToUser(id, updateUserDto, add) {
        const addOrRemove = add ? '$addToSet' : '$pullAll';
        const updatedUser = await this.userModel.findByIdAndUpdate(id, {
            [addOrRemove]: { roles: updateUserDto.roles },
        }, { new: true });
        if (!updatedUser) {
            throw new common_1.NotFoundException('User not found');
        }
        return updatedUser;
    }
    async updateOne(id, updateUserDto, user) {
        if (id === user.id || user.roles.includes('admin')) {
            const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
            if (!updatedUser) {
                throw new common_1.NotFoundException(`User id: ${id} not found`);
            }
            return updatedUser;
        }
    }
    async deleteOne(id) {
        return this.userModel.findOneAndDelete({ id }).exec();
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        auth_service_1.AuthService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map