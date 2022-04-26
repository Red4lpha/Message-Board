const mongoose = require('mongoose');

const messagesSchema = mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Error: Please add a message']
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: [true, 'Error: Need an owner'],
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Messages',
    default: null, //If left at default, then assumed to be a top level message
  },
  vote_count : {
    type: Number,
    required: [true, 'Error:  Need a vote count'],
    default: 1
  }
},
{
  timestamps: true
})

module.exports = mongoose.model('Messages', messagesSchema);