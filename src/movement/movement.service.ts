import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BalanceService } from 'src/balance/balance.service';
import { CurrencyService } from 'src/currency/currency.service';
import {
  Currency,
  CurrencyDocument,
} from 'src/currency/schema/currency.schema';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/uprate-balance.dto';
import { Movement, MovementDocument } from './schema/movement.schema';

@Injectable()
export class MovementService {
  constructor(
    @InjectModel(Movement.name) private movementModel: Model<MovementDocument>,
    private balanceService: BalanceService,
    private currencyService: CurrencyService,
  ) {}

  async findAll(): Promise<Movement[]> {
    return this.movementModel.find().populate({ path: 'currency' }).exec();
  }

  async createMany(
    createMovementsDto: CreateMovementDto[],
  ): Promise<Movement[]> {
    const newMovementsDto: CreateMovementDto[] = [];
    await Promise.all(
      createMovementsDto.map(async (movement) => {
        const { currency, type } = movement;
        let { total: executed } = movement;
        await this.currencyService.findById(currency);
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
