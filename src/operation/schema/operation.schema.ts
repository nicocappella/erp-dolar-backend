import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Client } from 'src/client/schema/client.schema';
import { Currency } from 'src/currency/schema/currency.schema';
import { Operator } from 'src/operator/schema/operator.schema';

export type OperationDocument = Operation & Document;

@Schema({ timestamps: true })
export class Operation {
  @Prop({
    type: MongoSchema.Types.ObjectId,
    ref: 'Client',
    required: true,
    trim: true,
  })
  @Type(() => Client)
  client: Client;

  @Prop({
    type: MongoSchema.Types.ObjectId,
    ref: 'Operator',
    required: true,
    trim: true,
  })
  @Type(() => Operator)
  operator: Operator;

  @Prop({ type: String, enum: ['Compra', 'Venta'], required: true, trim: true })
  operation: string;

  @Prop({
    type: MongoSchema.Types.ObjectId,
    ref: 'Currency',
    required: true,
    trim: true,
  })
  @Type(() => Currency)
  listedCurrency: Currency;

  @Prop({
    type: MongoSchema.Types.ObjectId,
    ref: 'Currency',
    required: true,
    trim: true,
  })
  refCurrency: Currency;

  @Prop({ type: Number, required: true })
  rate: number;

  @Prop({ type: Number, required: true })
  buy: number;

  @Prop({ type: Number, required: true })
  sell: number;

  @Prop({
    type: String,
    required: true,
    trim: true,
    enum: ['Cerrada', 'Ejecutada'],
  })
  state: string;
}

export const OperationSchema = SchemaFactory.createForClass(Operation);
