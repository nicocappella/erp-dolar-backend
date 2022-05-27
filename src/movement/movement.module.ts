import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BalanceModule } from 'src/balance/balance.module';
import { CurrencyModule } from 'src/currency/currency.module';
import { MovementController } from './movement.controller';
import { MovementService } from './movement.service';
import { Movement, MovementSchema } from './schema/movement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Movement.name, schema: MovementSchema },
    ]),
    BalanceModule,
    CurrencyModule,
  ],
  controllers: [MovementController],
  providers: [MovementService],
})
export class MovementModule {}
