import mongoose, { Model } from 'mongoose';
import { BalanceService } from 'src/balance/balance.service';
import { CurrencyService } from 'src/currency/currency.service';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { Movement, MovementDocument } from './schema/movement.schema';
import { OperatorService } from 'src/operator/operator.service';
export declare class MovementService {
    private movementModel;
    private readonly connection;
    private balanceService;
    private currencyService;
    private operatorService;
    constructor(movementModel: Model<MovementDocument>, connection: mongoose.Connection, balanceService: BalanceService, currencyService: CurrencyService, operatorService: OperatorService);
    findAll(): Promise<Movement[]>;
    createMany(createMovementsDto: CreateMovementDto[]): Promise<(mongoose.Document<unknown, {}, mongoose.MergeType<any, Movement & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>> & Omit<Omit<any, "currency" | "type" | "total" | "operator" | "reason" | "__v" | "_id" | "$assertPopulated" | "$clone" | "$getAllSubdocs" | "$ignore" | "$isDefault" | "$isDeleted" | "$getPopulatedDocs" | "$inc" | "$isEmpty" | "$isValid" | "$locals" | "$markValid" | "$model" | "$op" | "$session" | "$set" | "$where" | "baseModelName" | "collection" | "db" | "deleteOne" | "depopulate" | "directModifiedPaths" | "equals" | "errors" | "get" | "getChanges" | "id" | "increment" | "init" | "invalidate" | "isDirectModified" | "isDirectSelected" | "isInit" | "isModified" | "isNew" | "isSelected" | "markModified" | "modifiedPaths" | "overwrite" | "$parent" | "populate" | "populated" | "replaceOne" | "save" | "schema" | "set" | "toJSON" | "toObject" | "unmarkModified" | "updateOne" | "validate" | "validateSync"> & Movement & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }, never>)[]>;
    updateOne(id: string, updateMovementDto: UpdateMovementDto): Promise<void>;
    deleteOne(id: string): Promise<Movement>;
    deleteMany(ids: string[]): Promise<{
        deletedCount: number;
        acknowledged: boolean;
    }>;
    private updateBalance;
}
