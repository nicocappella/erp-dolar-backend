"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOperatorDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_operator_dto_1 = require("./create-operator.dto");
class UpdateOperatorDto extends (0, mapped_types_1.PartialType)(create_operator_dto_1.CreateOperatorDto) {
}
exports.UpdateOperatorDto = UpdateOperatorDto;
//# sourceMappingURL=update-operator.dto.js.map