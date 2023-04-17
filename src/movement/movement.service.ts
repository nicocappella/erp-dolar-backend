import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { BalanceService } from 'src/balance/balance.service';
import { CurrencyService } from 'src/currency/currency.service';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { Movement, MovementDocument } from './schema/movement.schema';
import { OperatorService } from 'src/operator/operator.service';

@Injectable()
export class MovementService {
  constructor(
    @InjectModel(Movement.name) private movementModel: Model<MovementDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection,
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

  async createMany(createMovementsDto: CreateMovementDto[]) {
    const newMovementsDto = [];
    await Promise.all(
      createMovementsDto.map(async (movement) => {
        const { currency, type, operator } = movement;
        let { total: executed } = movement;
        await this.currencyService.findById(currency);
        await this.operatorService.findById(operator);
        executed =
          type === 'Agregar' ? Math.abs(executed) : -Math.abs(executed);
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

  async updateOne(id: string, updateMovementDto: UpdateMovementDto) {
    const session = await this.connection.startSession();
    await session.withTransaction(async () => {
      const oldMovement = await this.movementModel.findById(id);
      const existingMovement = await this.movementModel
        .findByIdAndUpdate(
          id,
          {
            $set: {
              ...updateMovementDto,
              total:
                updateMovementDto.type === 'Agregar'
                  ? Math.abs(updateMovementDto.total)
                  : -Math.abs(updateMovementDto.total),
            },
          },
          { new: true },
        )
        .exec();
      if (!existingMovement) {
        throw new NotFoundException(`Movement ${id} not found`);
      }
      await this.balanceService.createOrUpdate(
        oldMovement.currency.toString(),
        {
          currency: oldMovement.currency.toString(),
          executed: oldMovement.type ? -oldMovement.total : oldMovement.total,
        },
      );
      console.log(existingMovement.total);
      await this.balanceService.createOrUpdate(
        existingMovement.currency.toString(),
        {
          currency: existingMovement.currency.toString(),
          executed:
            existingMovement.type === 'Agregar'
              ? Math.abs(existingMovement.total)
              : -Math.abs(existingMovement.total),
        },
      );
      return existingMovement;
    });
    session.endSession();
  }

  async deleteOne(id: string): Promise<Movement> {
    const deletedMovement = await this.movementModel
      .findByIdAndDelete(id)
      .exec();

    if (deletedMovement) {
      const { currency, total, type, operator } = deletedMovement;
      await this.updateBalance({ currency, total: -total, type, operator });
      return deletedMovement;
    }
    throw new NotFoundException(`Movement ${id} not found`);
  }
  async deleteMany(
    ids: string[],
  ): Promise<{ deletedCount: number; acknowledged: boolean }> {
    const movenetDocs = await this.movementModel
      .find({ _id: { $in: ids } })
      .exec();
    const deleteMovements = await this.movementModel
      .deleteMany({
        _id: { $in: ids },
      })
      .exec();

    if (movenetDocs && deleteMovements.deletedCount > 0) {
      movenetDocs.forEach(async (id) => {
        await this.updateBalance(id);
      });
    }
    if (deleteMovements.deletedCount === 0) {
      throw new NotFoundException('Movements not found');
    }
    return deleteMovements;
  }

  private async updateBalance(movement: Movement): Promise<Movement> {
    const { currency, total, type } = movement;
    await this.balanceService.createOrUpdate(currency.toString(), {
      currency: currency.toString(),
      executed: total,
    });
    return movement;
  }
}
