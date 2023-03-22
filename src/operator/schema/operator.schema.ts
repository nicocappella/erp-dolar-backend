import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OperatorDocument = Operator & Document;

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
export class Operator {
  @Prop({ name: String, required: true, trim: true, unique: true })
  name: string;
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

export const OperatorSchema = SchemaFactory.createForClass(Operator);
