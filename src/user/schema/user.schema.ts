import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';

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
  @ExcludeProperty()
  password: string;

  @Prop({
    type: [String],
    default: ['operator'],
  })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
