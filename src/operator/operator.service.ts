import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOperatorDto } from './dto/createOperator.dto';
import { Operator, OperatorDocument } from './schema/operator.schema';

@Injectable()
export class OperatorService {
  constructor(
    @InjectModel(Operator.name) private operatorModel: Model<OperatorDocument>,
  ) {}

  async createOne(createOperatorDto: CreateOperatorDto): Promise<Operator> {
    const createOperator = new this.operatorModel(createOperatorDto);
    return createOperator.save();
  }

  async findAll(): Promise<Operator[]> {
    return this.operatorModel.find().sort({ name: 1 }).exec();
  }
  async findOne(id: string): Promise<Operator> {
    return this.operatorModel.findOne({ _id: id });
  }
}
