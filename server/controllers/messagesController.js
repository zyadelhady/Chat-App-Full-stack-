const Message = require('../models/messageModel');
const Room = require('../models/RoomModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllMessages = catchAsync(async (req, res, next) => {
  const firstUser = req.body.fromUsername;
  const secondUser = req.body.toUsername;

  const roomName1 = `room-${firstUser}-${secondUser}`;
  const roomName2 = `room-${secondUser}-${firstUser}`;

  const room = await Room.findOne({
    roomName: { $in: [roomName1, roomName2] }
  });

  if (!room) {
    return next(new AppError('No room found ', 400));
  }

  const messages = await Message.find({ room: room._id });

  res.status(200).json({
    status: 'success',
    data: {
      messages
    }
  });
});
