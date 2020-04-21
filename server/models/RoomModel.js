const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  firstUser: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  secondUser: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  roomName: {
    type: String,
    unique: true
  },
  cretedAt: {
    type: Date,
    default: Date.now()
  },
  messages: [{ type: mongoose.Schema.ObjectId, ref: 'Message' }]
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
