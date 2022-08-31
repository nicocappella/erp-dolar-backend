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
exports.MovementService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const balance_service_1 = require("../balance/balance.service");
const currency_service_1 = require("../currency/currency.service");
const movement_schema_1 = require("./schema/movement.schema");
const operator_service_1 = require("../operator/operator.service");
let MovementService = class MovementService {
    constructor(movementModel, balanceService, currencyService, operatorService) {
        this.movementModel = movementModel;
        this.balanceService = balanceService;
        this.currencyService = currencyService;
        this.operatorService = operatorService;
    }
    async findAll() {
        return this.movementModel
            .find()
            .populate({ path: 'operator' })
            .populate({ path: 'currency' })
            .exec();
    }
    async createMany(createMovementsDto) {
        const newMovementsDto = [];
        await Promise.all(createMovementsDto.map(async (movement) => {
            const { currency, type, operator } = movement;
            let { total: executed } = movement;
            await this.currencyService.findById(currency);
            await this.operatorService.findById(operator);
            executed =
                (type === 'Agregar' && executed > 0) ||
                    (type === 'Retirar' && executed < 0)
                    ? executed
                    : executed * -1;
            newMovementsDto.push(Object.assign(Object.assign({}, movement), { total: executed }));
        }));
        const createMovements = this.movementModel.insertMany(newMovementsDto);
        newMovementsDto.forEach((d) => this.balanceService.createOrUpdate(d.currency, {
            currency: d.currency,
            executed: d.total,
        }));
        return createMovements;
    }
    async updateOne(id, updateMovementDto) {
        const existingMovement = await this.movementModel
            .findByIdAndUpdate(id, { $set: updateMovementDto }, { new: true })
            .exec();
        if (!existingMovement) {
            throw new common_1.NotFoundException(`Movement ${id} not found`);
        }
        return existingMovement;
    }
    async deleteOne(id) {
        const deletedMovement = await this.movementModel
            .findByIdAndDelete(id)
            .exec();
        if (deletedMovement) {
            const { currency, total, type } = deletedMovement;
            await this.balanceService.createOrUpdate(currency.toString(), {
                currency: currency.toString(),
                executed: type === 0 ? total : -total,
            });
            return deletedMovement;
        }
        throw new common_1.NotFoundException(`Movement ${id} not found`);
    }
};
MovementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(movement_schema_1.Movement.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        balance_service_1.BalanceService,
        currency_service_1.CurrencyService,
        operator_service_1.OperatorService])
], MovementService);
exports.MovementService = MovementService;
//# sourceMappingURL=movement.service.js.map