import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BalanceModule } from 'src/balance/balance.module';
import { Currency, CurrencySchema } from 'src/currency/schema/currency.schema';
import { MovementController } from './movement.controller';
import { MovementService } from './movement.service';
import { Movement, MovementSchema } from './schema/movement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Movement.name, schema: MovementSchema },
      { name: Currency.name, schema: CurrencySchema },
    ]),
    BalanceModule,
  ],
  controllers: [MovementController],
  providers: [MovementService],
})
export class MovementModule {}
