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
exports.BalanceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const currency_schema_1 = require("../currency/schema/currency.schema");
const balance_schema_1 = require("./schema/balance.schema");
let BalanceService = class BalanceService {
    constructor(balanceModel, currencyModel) {
        this.balanceModel = balanceModel;
        this.currencyModel = currencyModel;
    }
    async findAll() {
        return this.balanceModel
            .find()
            .or([{ closed: { $ne: 0 } }, { executed: { $ne: 0 } }])
            .populate({ path: 'currency' })
            .exec();
    }
    async findOne(_id) {
        const balance = await this.balanceModel.findOne({ _id });
        if (balance) {
            return balance;
        }
        throw new common_1.NotFoundException(`Balance ${_id} not found`);
    }
    async createOne(createBalanceDto) {
        const existingCurrency = await this.currencyModel.findOne({
            currency: createBalanceDto.currency,
        });
        if (!existingCurrency) {
            throw new common_1.NotFoundException(`Balance can't create without any currency`);
        }
        const createBalance = new this.balanceModel(createBalanceDto);
        return createBalance.save();
    }
    async updateOne(id, updateBalanceDto) {
        const executed = updateBalanceDto.executed ? updateBalanceDto.executed : 0;
        const closed = updateBalanceDto.closed ? updateBalanceDto.closed : 0;
        const existingBalance = await this.balanceModel
            .findByIdAndUpdate(id, {
            $inc: { executed, closed },
        }, { new: true })
            .exec();
        if (!existingBalance) {
            throw new common_1.NotFoundException(`Balance ${id} not found`);
        }
        return existingBalance;
    }
    async deleteOne(id) {
        const deletedBalance = await this.balanceModel.findByIdAndDelete(id).exec();
        if (!deletedBalance) {
            throw new common_1.NotFoundException(`Balance ${id} not found`);
        }
        return deletedBalance;
    }
    async createOrUpdate(currency, createBalanceDto) {
        const executed = createBalanceDto.executed ? createBalanceDto.executed : 0;
        const closed = createBalanceDto.closed ? createBalanceDto.closed : 0;
        const existingBalance = await this.balanceModel.findOneAndUpdate({
            currency,
        }, {
            $inc: {
                executed,
                closed,
            },
        }, {
            new: true,
        });
        if (!existingBalance) {
            return await this.createOne(createBalanceDto);
        }
        return existingBalance;
    }
};
BalanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(balance_schema_1.Balance.name)),
    __param(1, (0, mongoose_1.InjectModel)(currency_schema_1.Currency.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], BalanceService);
exports.BalanceService = BalanceService;
//# sourceMappingURL=balance.service.js.map