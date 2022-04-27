import { Schema, model, Types } from 'mongoose';
import { UsersInterface } from 'types/types';

const usersSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password']
  },
},
{
  timestamps: true
})

const Users = model<UsersInterface>('Users', usersSchema);
export = Users;