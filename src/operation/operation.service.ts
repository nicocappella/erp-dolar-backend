import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Error, Model } from 'mongoose';
import { BalanceService } from 'src/balance/balance.service';
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

  async findAll(date?: string): Promise<Operation[]> {
    const dateAfter = new Date(new Date(date).getTime() + 86400000);
    return this.operationModel
      .find(
        date && {
          updatedAt: {
            $gte: new Date(date),
            $lte: dateAfter,
          },
        },
      )
      .populate({ path: 'client' })
      .populate({ path: 'operator' })
      .populate({ path: 'listedCurrency' })
      .populate({ path: 'refCurrency' })
      .exec();
  }
  async findByClient(client: string): Promise<Operation[]> {
    return this.operationModel
      .find({ client })
      .populate({ path: 'client' })
      .populate({ path: 'operator' })
      .populate({ path: 'listedCurrency' })
      .populate({ path: 'refCurrency' })
      .exec();
  }
  async findByOperator(operator: string): Promise<Operation[]> {
    return this.operationModel
      .find({ operator })
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
  async findClosedOperations(): Promise<Operation[]> {
    const dateBefore = new Date();
    dateBefore.setHours(0, 0, 0, 0);

    return this.operationModel
      .find({ state: 'Cerrada', updatedAt: { $lt: dateBefore } })
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
    const oldOperation = await this.operationModel.findById(id);
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
    if (oldOperation) {
      const { refCurrency, listedCurrency, operation, buy, sell, state } =
        oldOperation;
      const deletedBuy = operation === 'Compra' ? listedCurrency : refCurrency;
      const deletedSell = operation === 'Compra' ? refCurrency : listedCurrency;
      const currentState = state === 'Cerrada' ? 'closed' : 'executed';
      await this.balanceService.createOrUpdate(deletedBuy.toString(), {
        currency: deletedBuy.toString(),
        [currentState]: -buy,
      });
      await this.balanceService.createOrUpdate(deletedSell.toString(), {
        currency: deletedSell.toString(),
        [currentState]: sell,
      });
      const { listedCurrency: listedCurr, refCurrency: refCurr } =
        existingOperation;
      const amountListedCurrency =
        existingOperation.operation === 'Compra'
          ? existingOperation.buy
          : -existingOperation.sell;
      const amountRefCurrency =
        existingOperation.operation === 'Compra'
          ? -existingOperation.sell
          : existingOperation.buy;
      const stateUpdated =
        existingOperation.state === 'Cerrada' ? 'closed' : 'executed';

      await this.balanceService.createOrUpdate(listedCurr.toString(), {
        currency: listedCurrency.toString(),
        [stateUpdated]: amountListedCurrency,
      });
      await this.balanceService.createOrUpdate(refCurr.toString(), {
        currency: refCurrency.toString(),
        [stateUpdated]: amountRefCurrency,
      });
    }
    return existingOperation;
  }

  async deleteOne(id: string): Promise<Operation> {
    const deletedOperation = await this.operationModel
      .findByIdAndDelete(id)
      .exec();
    if (deletedOperation) {
      const { refCurrency, listedCurrency, operation, buy, sell, state } =
        deletedOperation;
      const deletedBuy = operation === 'Compra' ? listedCurrency : refCurrency;
      const deletedSell = operation === 'Compra' ? refCurrency : listedCurrency;
      const currentState = state === 'Cerrada' ? 'closed' : 'executed';
      await this.balanceService.createOrUpdate(deletedBuy.toString(), {
        currency: deletedBuy.toString(),
        [currentState]: -buy,
      });
      await this.balanceService.createOrUpdate(deletedSell.toString(), {
        currency: deletedSell.toString(),
        [currentState]: sell,
      });
    }
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
