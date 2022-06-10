"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMovementDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_movement_dto_1 = require("./create-movement.dto");
class UpdateMovementDto extends (0, mapped_types_1.PartialType)(create_movement_dto_1.CreateMovementDto) {
}
exports.UpdateMovementDto = UpdateMovementDto;
//# sourceMappingURL=uprate-balance.dto.js.map