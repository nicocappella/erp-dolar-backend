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
exports.OperatorService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const operator_schema_1 = require("./schema/operator.schema");
let OperatorService = class OperatorService {
    constructor(operatorModel) {
        this.operatorModel = operatorModel;
    }
    async createOne(createOperatorDto) {
        const createOperator = new this.operatorModel(createOperatorDto);
        return createOperator.save();
    }
    async findAll() {
        return this.operatorModel.find().sort({ name: 1 }).exec();
    }
    async findById(id) {
        const operator = await this.operatorModel.findById(id).exec();
        if (!operator) {
            throw new common_1.NotFoundException(`Opertor id: ${id} not found`);
        }
        return operator;
    }
    async updateOne(id, updateOperatorDto) {
        const operatorUpdated = await this.operatorModel
            .findByIdAndUpdate(id, {
            $set: updateOperatorDto,
        }, { new: true })
            .exec();
        if (!operatorUpdated) {
            throw new common_1.NotFoundException('Operator not found');
        }
        return operatorUpdated;
    }
    async deleteOne(id) {
        return this.operatorModel.findByIdAndDelete({ _id: id }).exec();
    }
};
OperatorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(operator_schema_1.Operator.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OperatorService);
exports.OperatorService = OperatorService;
//# sourceMappingURL=operator.service.js.map