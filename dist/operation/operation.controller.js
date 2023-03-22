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
exports.OperationController = void 0;
const common_1 = require("@nestjs/common");
const create_operation_dto_1 = require("./dto/create-operation.dto");
const update_operation_dto_1 = require("./dto/update-operation.dto");
const operation_service_1 = require("./operation.service");
let OperationController = class OperationController {
    constructor(operationService) {
        this.operationService = operationService;
    }
    async getOperations({ limit, skip, date }) {
        return this.operationService.findAll(limit, skip, date);
    }
    async getClosedOperations() {
        return this.operationService.findClosedOperations();
    }
    async getOperation(id) {
        return this.operationService.findOne(id);
    }
    async getByClient(client) {
        return this.operationService.findByClient(client);
    }
    async getByOperator(operator) {
        return this.operationService.findByOperator(operator);
    }
    async createPost(createOperationDto, session) {
        return this.operationService.createOne(createOperationDto);
    }
    async updateOperation(id, updateOperationDto) {
        return this.operationService.updateOne(id, updateOperationDto);
    }
    async deleteOperation(id) {
        return this.operationService.deleteOne(id);
    }
    async deleteOperations(ids) {
        return this.operationService.deleteMany(ids);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OperationController.prototype, "getOperations", null);
__decorate([
    (0, common_1.Get)('closed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OperationController.prototype, "getClosedOperations", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OperationController.prototype, "getOperation", null);
__decorate([
    (0, common_1.Get)('client/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OperationController.prototype, "getByClient", null);
__decorate([
    (0, common_1.Get)('operator/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OperationController.prototype, "getByOperator", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_operation_dto_1.CreateOperationDto, Object]),
    __metadata("design:returntype", Promise)
], OperationController.prototype, "createPost", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_operation_dto_1.UpdateOperationDto]),
    __metadata("design:returntype", Promise)
], OperationController.prototype, "updateOperation", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OperationController.prototype, "deleteOperation", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], OperationController.prototype, "deleteOperations", null);
OperationController = __decorate([
    (0, common_1.Controller)('operation'),
    __metadata("design:paramtypes", [operation_service_1.OperationService])
], OperationController);
exports.OperationController = OperationController;
//# sourceMappingURL=operation.controller.js.map