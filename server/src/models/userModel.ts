import { Schema, model, Document, Query } from 'mongoose';
import bcrypt from 'bcryptjs';
import { isEmail } from '../utils/isEmail';

interface IUserBase extends Document {
  username: string;
  email: string;
  photo?: string;
  password?: string;
  passwordConfirm?: string;
  online?: boolean;
}

interface IUserSchema extends IUserBase {
  correctPassword: (
    candidatePassword: string,
    userPassword: string
  ) => Promise<boolean>;
}

export interface IUser extends IUserSchema {}

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'A user must have a username'],
  },

  email: {
    type: String,
    required: [true, 'A user must have an e-mail'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please provide a valid email'],
  },

  photo: {
    type: String,
    default: 'default.jpg',
  },

  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: 8,
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (this: IUser, el: string) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },

  online: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password!, 12);
    this.passwordConfirm = undefined;
  }
  if (this.isModified('username')) {
    this.username = this.username.replace(/\s+/g, '');
  }
  next();
});

userSchema.pre<Query<IUser>>(/^find/, function (next) {
  // this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export const User = model<IUser>('User', userSchema);
