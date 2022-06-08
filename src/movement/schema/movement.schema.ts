import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Currency } from 'src/currency/schema/currency.schema';

export type MovementDocument = Movement & Document;

@Schema({ timestamps: true })
export class Movement {
  @Prop({
    type: MongoSchema.Types.ObjectId,
    ref: 'Currency',
    required: true,
    trim: true,
  })
  currency: Currency;

  @Prop({
    type: String,
    required: true,
    trim: true,
    enum: ['Agregar', 'Retirar'],
  })
  type: number;

  @Prop({ type: Number, required: true })
  total: number;

  @Prop({
    type: MongoSchema.Types.ObjectId,
    ref: 'Operator',
    required: true,
    trim: true,
  })
  operator: string;

  @Prop({ type: String })
  reason: string;
}

export const MovementSchema = SchemaFactory.createForClass(Movement);
