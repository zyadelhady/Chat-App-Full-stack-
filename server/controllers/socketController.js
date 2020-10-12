const User = require('../models/userModel');
const Room = require('../models/RoomModel');
const Message = require('../models/messageModel');

module.exports = io => {
  io.on('connection', socket => {
    let currentRoom;
    let secondUser;

    socket.on('loggedIn', async user => {
      await User.findOneAndUpdate(
        {
          username: user.user.username
        },
        { $set: { socketId: socket.id, online: true } },
        { new: true }
      );

      const Users = await User.find();

      io.emit('userLoggedIn', { ...Users });
    });

    socket.on('join', async data => {
      secondUser = await User.findOne({ username: data.to });

      if (secondUser) {
        const roomName1 = `room-${data.username}-${data.to}`;
        const roomName2 = `room-${data.to}-${data.username}`;

        let room = await Room.findOne({
          roomName: { $in: [roomName1, roomName2] }
        });

        if (!room) {
          room = await Room.create({
            roomName: roomName1,
            firstUser: data._id,
            secondUser: secondUser._id
          });
        }

        socket.leave(currentRoom);
        socket.join(room.roomName);
        currentRoom = room.roomName;
      }
    });

    socket.on('createMsg', async data => {
      const roomName1 = `room-${data.username}-${data.to}`;
      const roomName2 = `room-${data.to}-${data.username}`;

      const room = await Room.findOne({
        roomName: { $in: [roomName1, roomName2] }
      });

      if (room) {
        const newMsg = await Message.create({
          room: room._id,
          from: data.from,
          to: secondUser._id,
          message: data.message
        });

        if (newMsg) {
          socket.broadcast
            .to(currentRoom)
            .emit('newMessage', { ...data, type: 'recevied' });
        }
      }
    });

    socket.on('typing', async name => {
      socket.broadcast
        .to(currentRoom)
        .emit('UserIsTyping', { name: name.name });
    });

    socket.on('stoppedTyping', () => {
      socket.broadcast.to(currentRoom).emit('UserStoppedTyping');
    });

    socket.on('disconnect', async () => {
      await User.findOneAndUpdate(
        {
          socketId: socket.id
        },
        { $set: { online: false, socketId: '', offlineAt: Date.now() } },
        { new: true }
      );

      const Users = await User.find();

      io.emit('userLoggedOut', { ...Users });
    });
  });
};
