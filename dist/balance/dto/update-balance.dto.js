"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBalanceDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_balance_dto_1 = require("./create-balance.dto");
class UpdateBalanceDto extends (0, mapped_types_1.PartialType)(create_balance_dto_1.CreateBalanceDto) {
}
exports.UpdateBalanceDto = UpdateBalanceDto;
//# sourceMappingURL=update-balance.dto.js.map