import { Model } from 'mongoose';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';
import { Operator, OperatorDocument } from './schema/operator.schema';
export declare class OperatorService {
    private operatorModel;
    constructor(operatorModel: Model<OperatorDocument>);
    createOne(createOperatorDto: CreateOperatorDto): Promise<Operator>;
    findAll(): Promise<Operator[]>;
    findById(id: string): Promise<Operator>;
    updateOne(id: string, updateOperatorDto: UpdateOperatorDto): Promise<Operator>;
    deleteOne(id: string): Promise<Operator>;
}
