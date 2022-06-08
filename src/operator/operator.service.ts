import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';
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
  async findById(id: string): Promise<Operator> {
    const operator = await this.operatorModel.findById(id).exec();
    if (!operator) {
      throw new NotFoundException(`Opertor id: ${id} not found`);
    }
    return operator;
  }
  async updateOne(
    id: string,
    updateOperatorDto: UpdateOperatorDto,
  ): Promise<Operator> {
    const operatorUpdated = await this.operatorModel
      .findByIdAndUpdate(
        id,
        {
          $set: updateOperatorDto,
        },
        { new: true },
      )
      .exec();
    if (!operatorUpdated) {
      throw new NotFoundException('Operator not found');
    }
    return operatorUpdated;
  }
  async deleteOne(id: string): Promise<Operator> {
    return this.operatorModel.findByIdAndDelete({ _id: id }).exec();
  }
}
