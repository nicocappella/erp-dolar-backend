import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update.currency.dto';
import { Currency, CurrencyDocument } from './schema/currency.schema';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectModel(Currency.name) private currencyModel: Model<CurrencyDocument>,
  ) {}

  async findAll(): Promise<Currency[]> {
    return this.currencyModel.find().exec();
  }
  async findById(id: string): Promise<Currency> {
    const existingCurrency = await this.currencyModel.findById(id);
    if (!existingCurrency) {
      throw new NotFoundException();
    }
    return existingCurrency;
  }
  async createOne(createCurrencyDto: CreateCurrencyDto): Promise<Currency> {
    const createCurrency = new this.currencyModel(createCurrencyDto);
    return createCurrency.save();
  }
  async updateOne(
    id: string,
    updateCurrencyDto: UpdateCurrencyDto,
  ): Promise<Currency> {
    const currencyUpdated = await this.currencyModel
      .findByIdAndUpdate(id, { $set: updateCurrencyDto }, { new: true })
      .exec();
    if (!currencyUpdated) {
      throw new NotFoundException(`Currency ${id} not found`);
    }
    return currencyUpdated;
  }
  async deleteOne(id: string): Promise<Currency> {
    return this.currencyModel.findByIdAndDelete({ _id: id }).exec();
  }
}
