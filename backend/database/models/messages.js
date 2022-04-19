const mongoose = require('mongoose');

const messagesSchema = mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please add a message']
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
},
{
  timestamps: true
})

module.exports = mongoose.model('Messages', messagesSchema);