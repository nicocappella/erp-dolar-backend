import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
}
