import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update.currency.dto';
export declare class CurrencyController {
    private currencyService;
    constructor(currencyService: CurrencyService);
    findCurrencies(): Promise<import("./schema/currency.schema").Currency[]>;
    createCurrency(createCurrencyDto: CreateCurrencyDto): Promise<import("./schema/currency.schema").Currency>;
    updateCurrency(id: string, updateCurrencyDto: UpdateCurrencyDto): Promise<import("./schema/currency.schema").Currency>;
    deleteCurrency(id: string): Promise<import("./schema/currency.schema").Currency>;
}
