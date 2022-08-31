import { CreateMovementsDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { MovementService } from './movement.service';
export declare class MovementController {
    private movementService;
    constructor(movementService: MovementService);
    findMovements(): Promise<import("./schema/movement.schema").Movement[]>;
    createMovements(createMovementDto: CreateMovementsDto): Promise<import("./schema/movement.schema").Movement[]>;
    updateMovement(id: string, updateMovementDto: UpdateMovementDto): Promise<import("./schema/movement.schema").Movement>;
    deleteMovement(id: string): Promise<import("./schema/movement.schema").Movement>;
}
