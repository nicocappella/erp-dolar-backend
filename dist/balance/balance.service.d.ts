import { Model } from 'mongoose';
import { CurrencyDocument } from 'src/currency/schema/currency.schema';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { Balance, BalanceDocument } from './schema/balance.schema';
export declare class BalanceService {
    private balanceModel;
    private currencyModel;
    constructor(balanceModel: Model<BalanceDocument>, currencyModel: Model<CurrencyDocument>);
    findAll(): Promise<Balance[]>;
    findOne(_id: string): Promise<Balance>;
    createOne(createBalanceDto: CreateBalanceDto): Promise<Balance>;
    updateOne(id: string, updateBalanceDto: UpdateBalanceDto): Promise<Balance>;
    deleteOne(id: string): Promise<Balance>;
    createOrUpdate(currency: string, createBalanceDto: CreateBalanceDto): Promise<Balance>;
}
