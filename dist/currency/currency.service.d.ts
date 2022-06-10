import { Model } from 'mongoose';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update.currency.dto';
import { Currency, CurrencyDocument } from './schema/currency.schema';
export declare class CurrencyService {
    private currencyModel;
    constructor(currencyModel: Model<CurrencyDocument>);
    findAll(): Promise<Currency[]>;
    findById(id: string): Promise<Currency>;
    createOne(createCurrencyDto: CreateCurrencyDto): Promise<Currency>;
    updateOne(id: string, updateCurrencyDto: UpdateCurrencyDto): Promise<Currency>;
    deleteOne(id: string): Promise<Currency>;
}
