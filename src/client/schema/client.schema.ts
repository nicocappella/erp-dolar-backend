import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document;

@Schema({ timestamps: true })
export class Client {
  @Prop({ name: String, required: true, trim: true, unique: true })
  name: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
