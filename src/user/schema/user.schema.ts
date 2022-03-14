import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { hash } from 'bcryptjs';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({
    type: String,
    // required: true,
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
    type: [String],
  })
  roles: string[];
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.toJSON = function (this: User) {
  const userObject = this.toObject();

  delete userObject.password;

  return userObject;
};

UserSchema.pre('save', async function (this: User, next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 8);
  }
  next();
});

export { UserSchema };
