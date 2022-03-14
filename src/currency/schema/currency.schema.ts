import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CurrencyDocument = Currency & Document;

@Schema({ timestamps: true })
export class Currency {
  @Prop({ name: String, required: true, trim: true, unique: true })
  name: string;

  @Prop({ type: String, required: true, trim: true })
  value: string;

  @Prop({ type: String, required: true, trim: true })
  symbol: string;

  @Prop({ type: Boolean, default: false })
  reference: boolean;

  @Prop({ type: Boolean, default: false })
  listed: boolean;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);
