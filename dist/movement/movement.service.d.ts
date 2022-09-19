import { Model } from 'mongoose';
import { BalanceService } from 'src/balance/balance.service';
import { CurrencyService } from 'src/currency/currency.service';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { Movement, MovementDocument } from './schema/movement.schema';
import { OperatorService } from 'src/operator/operator.service';
export declare class MovementService {
    private movementModel;
    private balanceService;
    private currencyService;
    private operatorService;
    constructor(movementModel: Model<MovementDocument>, balanceService: BalanceService, currencyService: CurrencyService, operatorService: OperatorService);
    findAll(): Promise<Movement[]>;
    createMany(createMovementsDto: CreateMovementDto[]): Promise<Movement[]>;
    updateOne(id: string, updateMovementDto: UpdateMovementDto): Promise<Movement>;
    deleteOne(id: string): Promise<Movement>;
    deleteMany(ids: string[]): Promise<{
        deletedCount: number;
        acknowledged: boolean;
    }>;
    private updateBalance;
}
