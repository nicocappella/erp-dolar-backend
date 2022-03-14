import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OperatorDocument = Operator & Document;

@Schema({ timestamps: true })
export class Operator {
  @Prop({ name: String, required: true, trim: true, unique: true })
  name: string;
}

export const OperatorSchema = SchemaFactory.createForClass(Operator);
