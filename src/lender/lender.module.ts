import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LenderController } from './lender.controller';
import { LenderService } from './lender.service';
import { Lender, LenderSchema } from './schema/lender.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lender.name, schema: LenderSchema }]),
  ],
  controllers: [LenderController],
  providers: [LenderService],
})
export class LenderModule {}
