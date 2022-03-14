import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Error, Model } from 'mongoose';
import { BalanceService } from 'src/balance/balance.service';
import { Balance, BalanceDocument } from 'src/balance/schema/balance.schema';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { Operation, OperationDocument } from './schema/operation.schema';

@Injectable()
export class OperationService {
  constructor(
    @InjectModel(Operation.name)
    private operationModel: Model<OperationDocument>,
    private balanceService: BalanceService,
  ) {}

  async findAll(): Promise<Operation[]> {
    return this.operationModel
      .find()
      .populate({ path: 'client' })
      .populate({ path: 'operator' })
      .populate({ path: 'listedCurrency' })
      .populate({ path: 'refCurrency' })
      .exec();
  }

  async findOne(id: string): Promise<Operation> {
    return this.operationModel
      .findById(id)
      .populate({ path: 'client' })
      .populate({ path: 'operator' })
      .populate({ path: 'listedCurrency' })
      .populate({ path: 'refCurrency' })
      .exec();
  }

  async createOne(createOperationDto: CreateOperationDto): Promise<Operation> {
    const createOperation = new this.operationModel(createOperationDto);
    try {
      const { listedCurrency, refCurrency } = createOperationDto;
      const amountListedCurrency =
        createOperationDto.operation === 'Compra'
          ? createOperationDto.buy
          : -createOperationDto.sell;
      const amountRefCurrency =
        createOperationDto.operation === 'Compra'
          ? -createOperationDto.sell
          : createOperationDto.buy;
      const state =
        createOperationDto.state === 'Cerrada' ? 'closed' : 'executed';

      await this.balanceService.createOrUpdate(listedCurrency, {
        currency: listedCurrency,
        [state]: amountListedCurrency,
      });
      await this.balanceService.createOrUpdate(refCurrency, {
        currency: refCurrency,
        [state]: amountRefCurrency,
      });

      return createOperation.save();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async updateOne(
    id: string,
    updateOperationDto: UpdateOperationDto,
  ): Promise<Operation> {
    const operation = await this.operationModel.findById(id);
    const existingOperation = await this.operationModel
      .findByIdAndUpdate(
        id,
        {
          $set: updateOperationDto,
        },
        {
          new: true,
        },
      )
      .exec();
    if (!existingOperation) {
      throw new NotFoundException(`Operation ${id} not found`);
    }
    if (updateOperationDto.state) {
      const key =
        updateOperationDto.state === 'Ejecutada' ? 'executed' : 'closed';
      const antiKey = key === 'executed' ? 'closed' : 'executed';

      if (operation) {
        if (operation.state === updateOperationDto.state) return operation;
        const { listedCurrency, refCurrency } = operation;
        const amountListedCurrency =
          operation.operation === 'Compra' ? operation.buy : -operation.sell;
        const amountRefCurrency =
          operation.operation === 'Compra' ? -operation.sell : operation.buy;

        await this.balanceService.createOrUpdate(listedCurrency.toString(), {
          currency: listedCurrency.toString(),
          [key]: amountListedCurrency,
          [antiKey]: -amountListedCurrency,
        });
        await this.balanceService.createOrUpdate(refCurrency.toString(), {
          currency: refCurrency.toString(),
          [key]: amountRefCurrency,
          [antiKey]: -amountRefCurrency,
        });
      }
    }
    return existingOperation;
  }

  async deleteOne(id: string): Promise<Operation> {
    const deletedOperation = await this.operationModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedOperation) {
      throw new NotFoundException(`Operation ${id} not found`);
    }

    return deletedOperation;
  }
  async deleteMany(ids: string[]): Promise<{ deletedCount: number }> {
    const deleteOperations = await this.operationModel
      .deleteMany({
        _id: { $in: ids },
      })
      .exec();
    if (!deleteOperations) {
      throw new NotFoundException(`Operations not found`);
    }
    return deleteOperations;
  }
}
