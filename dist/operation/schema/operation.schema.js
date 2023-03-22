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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationSchema = exports.Operation = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const client_schema_1 = require("../../client/schema/client.schema");
const currency_schema_1 = require("../../currency/schema/currency.schema");
const operator_schema_1 = require("../../operator/schema/operator.schema");
let Operation = class Operation {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
        trim: true,
    }),
    (0, class_transformer_1.Type)(() => client_schema_1.Client),
    __metadata("design:type", client_schema_1.Client)
], Operation.prototype, "client", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Operator',
        required: true,
        trim: true,
    }),
    (0, class_transformer_1.Type)(() => operator_schema_1.Operator),
    __metadata("design:type", operator_schema_1.Operator)
], Operation.prototype, "operator", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['Compra', 'Venta'], required: true, trim: true }),
    __metadata("design:type", String)
], Operation.prototype, "operation", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Currency',
        required: true,
        trim: true,
    }),
    (0, class_transformer_1.Type)(() => currency_schema_1.Currency),
    __metadata("design:type", currency_schema_1.Currency)
], Operation.prototype, "listedCurrency", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Currency',
        required: true,
        trim: true,
    }),
    __metadata("design:type", currency_schema_1.Currency)
], Operation.prototype, "refCurrency", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Operation.prototype, "rate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Operation.prototype, "buy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Operation.prototype, "sell", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        trim: true,
        enum: ['Cerrada', 'Ejecutada'],
    }),
    __metadata("design:type", String)
], Operation.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        select: false,
    }),
    __metadata("design:type", Number)
], Operation.prototype, "__v", void 0);
Operation = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (doc, returned, opts) => {
                returned.id = returned._id;
                delete returned._id;
            },
        },
    })
], Operation);
exports.Operation = Operation;
exports.OperationSchema = mongoose_1.SchemaFactory.createForClass(Operation);
//# sourceMappingURL=operation.schema.js.map