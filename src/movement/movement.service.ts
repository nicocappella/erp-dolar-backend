import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BalanceService } from 'src/balance/balance.service';
import { CurrencyService } from 'src/currency/currency.service';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/uprate-balance.dto';
import { Movement, MovementDocument } from './schema/movement.schema';
import { OperatorService } from 'src/operator/operator.service';

@Injectable()
export class MovementService {
  constructor(
    @InjectModel(Movement.name) private movementModel: Model<MovementDocument>,
    private balanceService: BalanceService,
    private currencyService: CurrencyService,
    private operatorService: OperatorService,
  ) {}

  async findAll(): Promise<Movement[]> {
    return this.movementModel
      .find()
      .populate({ path: 'operator' })
      .populate({ path: 'currency' })
      .exec();
  }

  async createMany(
    createMovementsDto: CreateMovementDto[],
  ): Promise<Movement[]> {
    const newMovementsDto = [];
    await Promise.all(
      createMovementsDto.map(async (movement) => {
        const { currency, type, operator } = movement;
        let { total: executed } = movement;
        await this.currencyService.findById(currency);
        await this.operatorService.findById(operator);
        executed =
          (type === 'Agregar' && executed > 0) ||
          (type === 'Retirar' && executed < 0)
            ? executed
            : executed * -1;
        newMovementsDto.push({ ...movement, total: executed });
      }),
    );
    const createMovements = this.movementModel.insertMany(newMovementsDto);
    newMovementsDto.forEach((d) =>
      this.balanceService.createOrUpdate(d.currency, {
        currency: d.currency,
        executed: d.total,
      }),
    );
    return createMovements;
  }

  async updateOne(
    id: string,
    updateMovementDto: UpdateMovementDto,
  ): Promise<Movement> {
    const existingMovement = await this.movementModel
      .findByIdAndUpdate(id, { $set: updateMovementDto }, { new: true })
      .exec();
    if (!existingMovement) {
      throw new NotFoundException(`Movement ${id} not found`);
    }
    return existingMovement;
  }

  async deleteOne(id: string): Promise<Movement> {
    const deletedMovement = await this.movementModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedMovement) {
      throw new NotFoundException(`Movement ${id} not found`);
    }
    return deletedMovement;
  }
}
