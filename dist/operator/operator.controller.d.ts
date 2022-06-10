import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';
import { OperatorService } from './operator.service';
import { Operator } from './schema/operator.schema';
export declare class OperatorController {
    private operatorService;
    constructor(operatorService: OperatorService);
    getOperators(): Promise<Operator[]>;
    getOperator(id: string): Promise<Operator>;
    createOperator(createOperatorDto: CreateOperatorDto): Promise<Operator>;
    updateOperator(id: string, updateOperatorDto: UpdateOperatorDto): Promise<Operator>;
    deleteOperator(id: string): Promise<Operator>;
}
