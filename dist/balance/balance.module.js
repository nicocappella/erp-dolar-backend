"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const currency_schema_1 = require("../currency/schema/currency.schema");
const balance_controller_1 = require("./balance.controller");
const balance_service_1 = require("./balance.service");
const balance_schema_1 = require("./schema/balance.schema");
let BalanceModule = class BalanceModule {
};
BalanceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: balance_schema_1.Balance.name, schema: balance_schema_1.BalanceSchema },
                { name: currency_schema_1.Currency.name, schema: currency_schema_1.CurrencySchema },
            ]),
        ],
        controllers: [balance_controller_1.BalanceController],
        providers: [balance_service_1.BalanceService],
        exports: [balance_service_1.BalanceService],
    })
], BalanceModule);
exports.BalanceModule = BalanceModule;
//# sourceMappingURL=balance.module.js.map