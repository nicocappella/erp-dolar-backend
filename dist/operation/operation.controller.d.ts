import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { OperationService } from './operation.service';
export declare class OperationController {
    private operationService;
    constructor(operationService: OperationService);
    getOperations({ limit, skip, date }: PaginationQueryDto & {
        date: string;
    }): Promise<import("./schema/operation.schema").Operation[]>;
    getClosedOperations(): Promise<import("./schema/operation.schema").Operation[]>;
    getOperation(id: string): Promise<import("./schema/operation.schema").Operation>;
    getByClient(client: string): Promise<import("./schema/operation.schema").Operation[]>;
    getByOperator(operator: string): Promise<import("./schema/operation.schema").Operation[]>;
    createPost(createOperationDto: CreateOperationDto, session: Record<string, any>): Promise<import("./schema/operation.schema").Operation>;
    updateOperation(id: string, updateOperationDto: UpdateOperationDto): Promise<import("./schema/operation.schema").Operation>;
    deleteOperation(id: string): Promise<import("./schema/operation.schema").Operation>;
    deleteOperations(ids: string[]): Promise<{
        deletedCount: number;
    }>;
}
