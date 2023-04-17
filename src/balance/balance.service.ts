import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Currency,
  CurrencyDocument,
} from 'src/currency/schema/currency.schema';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { Balance, BalanceDocument } from './schema/balance.schema';

@Injectable()
export class BalanceService {
  constructor(
    @InjectModel(Balance.name) private balanceModel: Model<BalanceDocument>,
    @InjectModel(Currency.name) private currencyModel: Model<CurrencyDocument>,
  ) {}

  async findAll(): Promise<Balance[]> {
    return this.balanceModel
      .find()
      .or([{ closed: { $ne: 0 } }, { executed: { $ne: 0 } }])
      .populate({ path: 'currency' })
      .exec();
  }

  async findOne(_id: string): Promise<Balance> {
    const balance = await this.balanceModel.findOne({ _id });
    if (balance) {
      return balance;
    }
    throw new NotFoundException(`Balance ${_id} not found`);
  }
  async createOne(createBalanceDto: CreateBalanceDto): Promise<Balance> {
    console.log(createBalanceDto.currency);
    const existingCurrency = await this.currencyModel.findById(
      createBalanceDto.currency,
    );
    if (!existingCurrency) {
      throw new NotFoundException(`Balance can't create without any currency`);
    }
    const createBalance = new this.balanceModel(createBalanceDto);
    return createBalance.save();
  }
  async updateOne(
    id: string,
    updateBalanceDto: UpdateBalanceDto,
  ): Promise<Balance> {
    const executed = updateBalanceDto.executed ? updateBalanceDto.executed : 0;
    const closed = updateBalanceDto.closed ? updateBalanceDto.closed : 0;
    const existingBalance = await this.balanceModel
      .findByIdAndUpdate(
        id,
        {
          $inc: { executed, closed },
        },
        { new: true },
      )
      .exec();
    if (!existingBalance) {
      throw new NotFoundException(`Balance ${id} not found`);
    }
    return existingBalance;
  }
  async deleteOne(id: string): Promise<Balance> {
    const deletedBalance = await this.balanceModel.findByIdAndDelete(id).exec();
    if (!deletedBalance) {
      throw new NotFoundException(`Balance ${id} not found`);
    }
    return deletedBalance;
  }
  async createOrUpdate(
    currency: string,
    createBalanceDto: CreateBalanceDto,
  ): Promise<Balance> {
    const executed = createBalanceDto.executed ? createBalanceDto.executed : 0;
    const closed = createBalanceDto.closed ? createBalanceDto.closed : 0;
    const existingBalance = await this.balanceModel.findOneAndUpdate(
      {
        currency,
      },
      {
        $inc: {
          executed,
          closed,
        },
      },
      {
        new: true,
      },
    );
    if (!existingBalance) {
      return this.createOne(createBalanceDto);
    }
    return existingBalance;
  }
}
