import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

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

export const UserSchema = SchemaFactory.createForClass(User);
