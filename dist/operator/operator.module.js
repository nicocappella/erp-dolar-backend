"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperatorModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const operator_controller_1 = require("./operator.controller");
const operator_service_1 = require("./operator.service");
const operator_schema_1 = require("./schema/operator.schema");
let OperatorModule = class OperatorModule {
};
OperatorModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: operator_schema_1.Operator.name, schema: operator_schema_1.OperatorSchema },
            ]),
        ],
        controllers: [operator_controller_1.OperatorController],
        exports: [operator_service_1.OperatorService],
        providers: [operator_service_1.OperatorService],
    })
], OperatorModule);
exports.OperatorModule = OperatorModule;
//# sourceMappingURL=operator.module.js.map