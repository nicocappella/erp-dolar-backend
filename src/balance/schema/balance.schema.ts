import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Currency } from 'src/currency/schema/currency.schema';

export type BalanceDocument = Balance & Document;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, returned, opts) => {
      returned.id = returned._id;
      delete returned._id;
    },
  },
})
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
  @Prop({
    type: Number,
    select: false,
  })
  __v: number;

  @Prop({
    select: false,
  })
  createdAt: string;

  @Prop({
    select: false,
  })
  updatedAt: string;
}

export const BalanceSchema = SchemaFactory.createForClass(Balance);
