import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Currency } from 'src/currency/schema/currency.schema';

export type MovementDocument = Movement & Document;

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
  @Prop({
    type: Number,
    select: false,
  })
  __v: number;
}

export const MovementSchema = SchemaFactory.createForClass(Movement);
