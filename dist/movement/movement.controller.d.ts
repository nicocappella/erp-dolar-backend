/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateMovementsDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { MovementService } from './movement.service';
export declare class MovementController {
    private movementService;
    constructor(movementService: MovementService);
    findMovements(): Promise<import("./schema/movement.schema").Movement[]>;
    createMovements(createMovementDto: CreateMovementsDto): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").MergeType<any, import("./schema/movement.schema").Movement & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>> & Omit<Omit<any, "currency" | "type" | "total" | "operator" | "reason" | "__v" | "_id" | "$assertPopulated" | "$clone" | "$getAllSubdocs" | "$ignore" | "$isDefault" | "$isDeleted" | "$getPopulatedDocs" | "$inc" | "$isEmpty" | "$isValid" | "$locals" | "$markValid" | "$model" | "$op" | "$session" | "$set" | "$where" | "baseModelName" | "collection" | "db" | "deleteOne" | "depopulate" | "directModifiedPaths" | "equals" | "errors" | "get" | "getChanges" | "id" | "increment" | "init" | "invalidate" | "isDirectModified" | "isDirectSelected" | "isInit" | "isModified" | "isNew" | "isSelected" | "markModified" | "modifiedPaths" | "overwrite" | "$parent" | "populate" | "populated" | "replaceOne" | "save" | "schema" | "set" | "toJSON" | "toObject" | "unmarkModified" | "updateOne" | "validate" | "validateSync"> & import("./schema/movement.schema").Movement & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    updateMovement(id: string, updateMovementDto: UpdateMovementDto): Promise<void>;
    deleteMovement(id: string): Promise<import("./schema/movement.schema").Movement>;
    deleteOperations(ids: string[]): Promise<{
        deletedCount: number;
        acknowledged: boolean;
    }>;
}
