import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  })
  password: string;

  @Prop({
    type: [{ type: String, trim: true }],
    default: ['operator'],
  })
  roles: string[];

  @Prop({
    type: String,
    match:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    unique: true,
  })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
