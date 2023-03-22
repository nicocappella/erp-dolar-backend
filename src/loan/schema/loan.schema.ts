import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Client } from 'src/client/schema/client.schema';
import { Currency } from 'src/currency/schema/currency.schema';
import { Lender } from 'src/lender/schema/lender.schema';

export type LoanDocument = Loan & Document;

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
export class Loan {
  @Prop({
    type: MongoSchema.Types.ObjectId,
    ref: 'Lender',
    required: true,
    trim: true,
  })
  @Type(() => Client)
  lender: Lender;

  @Prop({
    type: String,
    enum: ['Débito', 'Crédito'],
    required: true,
    trim: true,
  })
  loan: string;

  @Prop({
    type: MongoSchema.Types.ObjectId,
    ref: 'Currency',
    required: true,
    trim: true,
  })
  @Type(() => Currency)
  currency: Currency;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({
    type: String,
    required: true,
    trim: true,
    enum: ['Cerrada', 'Ejecutada'],
  })
  state: string;
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

export const LoanSchema = SchemaFactory.createForClass(Loan);
