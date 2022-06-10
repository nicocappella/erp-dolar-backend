"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovementModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const balance_module_1 = require("../balance/balance.module");
const currency_module_1 = require("../currency/currency.module");
const operator_module_1 = require("../operator/operator.module");
const movement_controller_1 = require("./movement.controller");
const movement_service_1 = require("./movement.service");
const movement_schema_1 = require("./schema/movement.schema");
let MovementModule = class MovementModule {
};
MovementModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: movement_schema_1.Movement.name, schema: movement_schema_1.MovementSchema },
            ]),
            balance_module_1.BalanceModule,
            currency_module_1.CurrencyModule,
            operator_module_1.OperatorModule,
        ],
        controllers: [movement_controller_1.MovementController],
        providers: [movement_service_1.MovementService],
    })
], MovementModule);
exports.MovementModule = MovementModule;
//# sourceMappingURL=movement.module.js.map