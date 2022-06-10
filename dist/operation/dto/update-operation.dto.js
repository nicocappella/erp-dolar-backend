"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOperationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_operation_dto_1 = require("./create-operation.dto");
class UpdateOperationDto extends (0, mapped_types_1.PartialType)(create_operation_dto_1.CreateOperationDto) {
}
exports.UpdateOperationDto = UpdateOperationDto;
//# sourceMappingURL=update-operation.dto.js.map