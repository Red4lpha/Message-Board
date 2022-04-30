import mongoose, { Schema, model, Types } from 'mongoose';
import { MessagesInterface } from 'types/types';

/* interface MessagesInterface {
	text: string,
	owner: Types.ObjectId,
	parent?: Types.ObjectId,
	vote_count?: number,
} */

const messagesSchema = new Schema<MessagesInterface>({
  text: {
    type: String,
    required: [true, 'Error: Please add a message']
  },
  owner:{
    name: {
      type: String,
      required: [true, 'Error: Missing owners name']
    },
    name_id: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: [true, 'Error: Need an owner']
    }
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Messages',
    default: null, //If left at default, then assumed to be a top level message
  },
  ancestors: [{
    type: Schema.Types.ObjectId,
    ref: 'Messages',
  }],
  vote_count : {
    type: Number,
    //required: [true, 'Error:  Need a vote count'],
    default: 1
  }
},
{
  timestamps: true
})

const Messages = model<MessagesInterface>('Messages', messagesSchema);
export = Messages;