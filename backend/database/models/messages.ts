import mongoose, { Schema, model, Types } from 'mongoose';
import { MessagesInterface } from 'types/types';

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
  votes: {
    vote_count: {
    type: Number,
    default: 1
    },
    voters: [{
      type: Schema.Types.ObjectId,
      ref: 'Users',
    }]
  },
  deleted: {
    type: Boolean,
    default: false
  }
},
{
  timestamps: true
})

const Messages = model<MessagesInterface>('Messages', messagesSchema);
export = Messages;