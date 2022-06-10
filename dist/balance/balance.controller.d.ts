import { BalanceService } from './balance.service';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { Balance } from './schema/balance.schema';
export declare class BalanceController {
    private balanceService;
    constructor(balanceService: BalanceService);
    findBalances(): Promise<Balance[]>;
    createBalance(createBalanceDto: CreateBalanceDto): Promise<Balance>;
    updateBalance(id: string, updateBalanceDto: UpdateBalanceDto): Promise<Balance>;
    deleteClient(id: string): Promise<Balance>;
}
