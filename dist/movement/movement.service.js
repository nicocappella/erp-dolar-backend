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
    constructor(movementModel, connection, balanceService, currencyService, operatorService) {
        this.movementModel = movementModel;
        this.connection = connection;
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
                type === 'Agregar' ? Math.abs(executed) : -Math.abs(executed);
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
        const session = await this.connection.startSession();
        await session.withTransaction(async () => {
            const oldMovement = await this.movementModel.findById(id);
            const existingMovement = await this.movementModel
                .findByIdAndUpdate(id, {
                $set: Object.assign(Object.assign({}, updateMovementDto), { total: updateMovementDto.type === 'Agregar'
                        ? Math.abs(updateMovementDto.total)
                        : -Math.abs(updateMovementDto.total) }),
            }, { new: true })
                .exec();
            if (!existingMovement) {
                throw new common_1.NotFoundException(`Movement ${id} not found`);
            }
            await this.balanceService.createOrUpdate(oldMovement.currency.toString(), {
                currency: oldMovement.currency.toString(),
                executed: oldMovement.type ? -oldMovement.total : oldMovement.total,
            });
            console.log(existingMovement.total);
            await this.balanceService.createOrUpdate(existingMovement.currency.toString(), {
                currency: existingMovement.currency.toString(),
                executed: existingMovement.type === 'Agregar'
                    ? Math.abs(existingMovement.total)
                    : -Math.abs(existingMovement.total),
            });
            return existingMovement;
        });
        session.endSession();
    }
    async deleteOne(id) {
        const deletedMovement = await this.movementModel
            .findByIdAndDelete(id)
            .exec();
        if (deletedMovement) {
            const { currency, total, type, operator } = deletedMovement;
            await this.updateBalance({ currency, total: -total, type, operator });
            return deletedMovement;
        }
        throw new common_1.NotFoundException(`Movement ${id} not found`);
    }
    async deleteMany(ids) {
        const movenetDocs = await this.movementModel
            .find({ _id: { $in: ids } })
            .exec();
        const deleteMovements = await this.movementModel
            .deleteMany({
            _id: { $in: ids },
        })
            .exec();
        if (movenetDocs && deleteMovements.deletedCount > 0) {
            movenetDocs.forEach(async (id) => {
                await this.updateBalance(id);
            });
        }
        if (deleteMovements.deletedCount === 0) {
            throw new common_1.NotFoundException('Movements not found');
        }
        return deleteMovements;
    }
    async updateBalance(movement) {
        const { currency, total, type } = movement;
        await this.balanceService.createOrUpdate(currency.toString(), {
            currency: currency.toString(),
            executed: total,
        });
        return movement;
    }
};
MovementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(movement_schema_1.Movement.name)),
    __param(1, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Model, mongoose_2.default.Connection, balance_service_1.BalanceService,
        currency_service_1.CurrencyService,
        operator_service_1.OperatorService])
], MovementService);
exports.MovementService = MovementService;
//# sourceMappingURL=movement.service.js.map