import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CurrencyDocument = Currency & Document;

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
export class Currency {
  @Prop({ name: String, required: true, trim: true, unique: true })
  name: string;

  @Prop({ type: String, required: true, trim: true, unique: true })
  value: string;

  @Prop({ type: String, required: true, trim: true, unique: true })
  symbol: string;

  @Prop({ type: Boolean, default: false })
  reference: boolean;

  @Prop({ type: Boolean, default: false })
  listed: boolean;

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

export const CurrencySchema = SchemaFactory.createForClass(Currency);
