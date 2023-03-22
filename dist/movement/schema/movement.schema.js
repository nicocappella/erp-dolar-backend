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
exports.MovementSchema = exports.Movement = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const currency_schema_1 = require("../../currency/schema/currency.schema");
let Movement = class Movement {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Currency',
        required: true,
        trim: true,
    }),
    __metadata("design:type", currency_schema_1.Currency)
], Movement.prototype, "currency", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        trim: true,
        enum: ['Agregar', 'Retirar'],
    }),
    __metadata("design:type", Number)
], Movement.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Movement.prototype, "total", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Operator',
        required: true,
        trim: true,
    }),
    __metadata("design:type", String)
], Movement.prototype, "operator", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Movement.prototype, "reason", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        select: false,
    }),
    __metadata("design:type", Number)
], Movement.prototype, "__v", void 0);
Movement = __decorate([
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
], Movement);
exports.Movement = Movement;
exports.MovementSchema = mongoose_1.SchemaFactory.createForClass(Movement);
//# sourceMappingURL=movement.schema.js.map