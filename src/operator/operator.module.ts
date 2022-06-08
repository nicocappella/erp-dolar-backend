import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OperatorController } from './operator.controller';
import { OperatorService } from './operator.service';
import { Operator, OperatorSchema } from './schema/operator.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Operator.name, schema: OperatorSchema },
    ]),
  ],
  controllers: [OperatorController],
  exports: [OperatorService],
  providers: [OperatorService],
})
export class OperatorModule {}
