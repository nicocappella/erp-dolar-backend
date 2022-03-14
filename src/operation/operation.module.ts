import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BalanceModule } from 'src/balance/balance.module';

import { OperationController } from './operation.controller';
import { OperationService } from './operation.service';
import { Operation, OperationSchema } from './schema/operation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Operation.name, schema: OperationSchema },
    ]),
    BalanceModule,
  ],
  controllers: [OperationController],
  providers: [OperationService],
})
export class OperationModule {}
