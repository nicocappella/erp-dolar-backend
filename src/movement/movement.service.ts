import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BalanceService } from 'src/balance/balance.service';
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
    @InjectModel(Currency.name) private currencyModel: Model<CurrencyDocument>,
    private balanceService: BalanceService,
  ) {}

  async findAll(): Promise<Movement[]> {
    return this.movementModel.find().exec();
  }

  async createOne(createMovementDto: CreateMovementDto): Promise<Movement> {
    const { currency, total: executed } = createMovementDto;
    const existingCurrency = await this.currencyModel.findById(currency);
    if (!existingCurrency) {
      throw new NotFoundException(`Currency doesn't exist`);
    }
    const createMovement = new this.movementModel(createMovementDto);
    await this.balanceService.createOrUpdate(currency, { currency, executed });
    return createMovement.save();
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
