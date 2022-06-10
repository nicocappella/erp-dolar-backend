import { Model } from 'mongoose';
import { BalanceService } from 'src/balance/balance.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { Operation, OperationDocument } from './schema/operation.schema';
export declare class OperationService {
    private operationModel;
    private balanceService;
    constructor(operationModel: Model<OperationDocument>, balanceService: BalanceService);
    findAll(date?: string): Promise<Operation[]>;
    findByClient(client: string): Promise<Operation[]>;
    findByOperator(operator: string): Promise<Operation[]>;
    findOne(id: string): Promise<Operation>;
    findClosedOperations(): Promise<Operation[]>;
    createOne(createOperationDto: CreateOperationDto): Promise<Operation>;
    updateOne(id: string, updateOperationDto: UpdateOperationDto): Promise<Operation>;
    deleteOne(id: string): Promise<Operation>;
    deleteMany(ids: string[]): Promise<{
        deletedCount: number;
    }>;
}
