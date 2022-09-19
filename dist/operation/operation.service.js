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
exports.OperationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const balance_service_1 = require("../balance/balance.service");
const operation_schema_1 = require("./schema/operation.schema");
let OperationService = class OperationService {
    constructor(operationModel, balanceService) {
        this.operationModel = operationModel;
        this.balanceService = balanceService;
    }
    async findAll(date) {
        const dateAfter = new Date(new Date(date).getTime() + 86400000);
        return this.operationModel
            .find(date && {
            updatedAt: {
                $gte: new Date(date),
                $lte: dateAfter,
            },
        })
            .populate({ path: 'client' })
            .populate({ path: 'operator' })
            .populate({ path: 'listedCurrency' })
            .populate({ path: 'refCurrency' })
            .exec();
    }
    async findByClient(client) {
        return this.operationModel
            .find({ client })
            .populate({ path: 'client' })
            .populate({ path: 'operator' })
            .populate({ path: 'listedCurrency' })
            .populate({ path: 'refCurrency' })
            .exec();
    }
    async findByOperator(operator) {
        return this.operationModel
            .find({ operator })
            .populate({ path: 'client' })
            .populate({ path: 'operator' })
            .populate({ path: 'listedCurrency' })
            .populate({ path: 'refCurrency' })
            .exec();
    }
    async findOne(id) {
        return this.operationModel
            .findById(id)
            .populate({ path: 'client' })
            .populate({ path: 'operator' })
            .populate({ path: 'listedCurrency' })
            .populate({ path: 'refCurrency' })
            .exec();
    }
    async findClosedOperations() {
        const dateBefore = new Date();
        dateBefore.setHours(0, 0, 0, 0);
        return this.operationModel
            .find({ state: 'Cerrada', updatedAt: { $lt: dateBefore } })
            .populate({ path: 'client' })
            .populate({ path: 'operator' })
            .populate({ path: 'listedCurrency' })
            .populate({ path: 'refCurrency' })
            .exec();
    }
    async createOne(createOperationDto) {
        const createOperation = new this.operationModel(createOperationDto);
        try {
            const { listedCurrency, refCurrency } = createOperationDto;
            const amountListedCurrency = createOperationDto.operation === 'Compra'
                ? createOperationDto.buy
                : -createOperationDto.sell;
            const amountRefCurrency = createOperationDto.operation === 'Compra'
                ? -createOperationDto.sell
                : createOperationDto.buy;
            const state = createOperationDto.state === 'Cerrada' ? 'closed' : 'executed';
            await this.balanceService.createOrUpdate(listedCurrency, {
                currency: listedCurrency,
                [state]: amountListedCurrency,
            });
            await this.balanceService.createOrUpdate(refCurrency, {
                currency: refCurrency,
                [state]: amountRefCurrency,
            });
            return createOperation.save();
        }
        catch (e) {
            throw new mongoose_2.Error(e.message);
        }
    }
    async updateOne(id, updateOperationDto) {
        const oldOperation = await this.operationModel.findById(id);
        const existingOperation = await this.operationModel
            .findByIdAndUpdate(id, {
            $set: updateOperationDto,
        }, {
            new: true,
        })
            .exec();
        if (!existingOperation) {
            throw new common_1.NotFoundException(`Operation ${id} not found`);
        }
        if (oldOperation) {
            const { refCurrency, listedCurrency, operation, buy, sell, state } = oldOperation;
            const deletedBuy = operation === 'Compra' ? listedCurrency : refCurrency;
            const deletedSell = operation === 'Compra' ? refCurrency : listedCurrency;
            const currentState = state === 'Cerrada' ? 'closed' : 'executed';
            await this.balanceService.createOrUpdate(deletedBuy.toString(), {
                currency: deletedBuy.toString(),
                [currentState]: -buy,
            });
            await this.balanceService.createOrUpdate(deletedSell.toString(), {
                currency: deletedSell.toString(),
                [currentState]: sell,
            });
            const { listedCurrency: listedCurr, refCurrency: refCurr } = existingOperation;
            const amountListedCurrency = existingOperation.operation === 'Compra'
                ? existingOperation.buy
                : -existingOperation.sell;
            const amountRefCurrency = existingOperation.operation === 'Compra'
                ? -existingOperation.sell
                : existingOperation.buy;
            const stateUpdated = existingOperation.state === 'Cerrada' ? 'closed' : 'executed';
            await this.balanceService.createOrUpdate(listedCurr.toString(), {
                currency: listedCurrency.toString(),
                [stateUpdated]: amountListedCurrency,
            });
            await this.balanceService.createOrUpdate(refCurr.toString(), {
                currency: refCurrency.toString(),
                [stateUpdated]: amountRefCurrency,
            });
        }
        return existingOperation;
    }
    async deleteOne(id) {
        const deletedOperation = await this.operationModel
            .findByIdAndDelete(id)
            .exec();
        if (deletedOperation) {
            await this.updateBalance(deletedOperation);
        }
        if (!deletedOperation) {
            throw new common_1.NotFoundException(`Operation ${id} not found`);
        }
        return deletedOperation;
    }
    async deleteMany(ids) {
        const operationDocs = await this.operationModel
            .find({
            _id: { $in: ids },
        })
            .exec();
        const deleteOperations = await this.operationModel
            .deleteMany({
            _id: { $in: ids },
        })
            .exec();
        if (operationDocs && deleteOperations.deletedCount > 0) {
            operationDocs.forEach(async (id) => {
                await this.updateBalance(id);
            });
        }
        if (deleteOperations.deletedCount === 0) {
            throw new common_1.NotFoundException(`Operations not found`);
        }
        return deleteOperations;
    }
    async updateBalance(op) {
        const { refCurrency, listedCurrency, operation, buy, sell, state } = op;
        const deletedBuy = operation === 'Compra' ? listedCurrency : refCurrency;
        const deletedSell = operation === 'Compra' ? refCurrency : listedCurrency;
        const currentState = state === 'Cerrada' ? 'closed' : 'executed';
        const balBuy = await this.balanceService.createOrUpdate(deletedBuy.toString(), {
            currency: deletedBuy.toString(),
            [currentState]: -buy,
        });
        const balSell = await this.balanceService.createOrUpdate(deletedSell.toString(), {
            currency: deletedSell.toString(),
            [currentState]: sell,
        });
        console.log(balBuy, balSell);
        return op;
    }
};
OperationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(operation_schema_1.Operation.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        balance_service_1.BalanceService])
], OperationService);
exports.OperationService = OperationService;
//# sourceMappingURL=operation.service.js.map