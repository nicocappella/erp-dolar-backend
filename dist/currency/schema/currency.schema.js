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
exports.CurrencySchema = exports.Currency = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Currency = class Currency {
};
__decorate([
    (0, mongoose_1.Prop)({ name: String, required: true, trim: true, unique: true }),
    __metadata("design:type", String)
], Currency.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, trim: true, unique: true }),
    __metadata("design:type", String)
], Currency.prototype, "value", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, trim: true, unique: true }),
    __metadata("design:type", String)
], Currency.prototype, "symbol", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Currency.prototype, "reference", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Currency.prototype, "listed", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        select: false,
    }),
    __metadata("design:type", Number)
], Currency.prototype, "__v", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        select: false,
    }),
    __metadata("design:type", String)
], Currency.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        select: false,
    }),
    __metadata("design:type", String)
], Currency.prototype, "updatedAt", void 0);
Currency = __decorate([
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
], Currency);
exports.Currency = Currency;
exports.CurrencySchema = mongoose_1.SchemaFactory.createForClass(Currency);
//# sourceMappingURL=currency.schema.js.map