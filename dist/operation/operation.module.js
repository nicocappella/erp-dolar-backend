"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const balance_module_1 = require("../balance/balance.module");
const operation_controller_1 = require("./operation.controller");
const operation_service_1 = require("./operation.service");
const operation_schema_1 = require("./schema/operation.schema");
let OperationModule = class OperationModule {
};
OperationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: operation_schema_1.Operation.name,
                    schema: operation_schema_1.OperationSchema,
                },
            ]),
            balance_module_1.BalanceModule,
        ],
        controllers: [operation_controller_1.OperationController],
        providers: [operation_service_1.OperationService],
    })
], OperationModule);
exports.OperationModule = OperationModule;
//# sourceMappingURL=operation.module.js.map