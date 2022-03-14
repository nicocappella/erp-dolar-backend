import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Currency } from 'src/currency/schema/currency.schema';

export type BalanceDocument = Balance & Document;

@Schema({ timestamps: true })
export class Balance {
  @Prop({
    type: MongoSchema.Types.ObjectId,
    ref: 'Currency',
    required: true,
    trim: true,
    unique: true,
  })
  currency: Currency;

  @Prop({
    type: Number,
    default: 0,
  })
  closed: number;

  @Prop({ type: Number, default: 0 })
  executed: number;
}

export const BalanceSchema = SchemaFactory.createForClass(Balance);
