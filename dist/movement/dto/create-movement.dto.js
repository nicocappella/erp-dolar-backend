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
exports.CreateMovementsDto = exports.CreateMovementDto = exports.TypeMovement = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var TypeMovement;
(function (TypeMovement) {
    TypeMovement[TypeMovement["Retirar"] = 0] = "Retirar";
    TypeMovement[TypeMovement["Agregar"] = 1] = "Agregar";
})(TypeMovement = exports.TypeMovement || (exports.TypeMovement = {}));
class CreateMovementDto {
}
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateMovementDto.prototype, "currency", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(TypeMovement),
    __metadata("design:type", String)
], CreateMovementDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateMovementDto.prototype, "total", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateMovementDto.prototype, "operator", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMovementDto.prototype, "reason", void 0);
exports.CreateMovementDto = CreateMovementDto;
class CreateMovementsDto {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateMovementDto),
    __metadata("design:type", Array)
], CreateMovementsDto.prototype, "movements", void 0);
exports.CreateMovementsDto = CreateMovementsDto;
//# sourceMappingURL=create-movement.dto.js.map