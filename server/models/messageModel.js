const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.ObjectId,
    ref: 'Room'
  },
  from: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  to: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  message: String,
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
