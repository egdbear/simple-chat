const RoomService = require('../services/room-service');
const _ = require('lodash');

module.exports = function (io) {
  io.on('connection', function (socket) {
    socket.on('list-rooms', function (data) {
      RoomService.listRooms(function(err, list) {
        if (err) {
          throw new Error(err);
        }

        socket.emit('list-rooms', list);
      })
    });
  });

  io.of('/room').on('connection', function(socket) {
    let currentRoomId = '';
    socket.on('join', function(roomId) {
      currentRoomId = roomId;
      socket.join(roomId);

      RoomService.listMessages(roomId, function(messages) {
        socket.emit('messages', messages);
      })
    });

    socket.on('disconnect', function(roomId) {
      currentRoomId = '';
      socket.leave(roomId);
    });

    socket.on('check-rooms', function(roomId) {
      RoomService.getRoom(roomId, function(err, room) {
        if (err) {
          throw new Error(err);
        }

        if (_.isEmpty(room)) {
          return socket.emit('empty-rooms', []);
        }

        socket.emit('empty-rooms', room);
      })
    });

    socket.on('message', function(data) {
      RoomService.saveMessage(data.roomId, data.message, data.userId, function(err, message) {
        if (err) {
          throw new Error(err);
        }

        socket.broadcast.to(data.roomId).emit('message', data.message);
      })
	  });

    socket.on('remove-message', function(data) {
      RoomService.removeMessage(data.roomId, data.message, function(err, newMessages) {
        if (err) {
          throw new Error(err);
        }

        socket.emit('messages', newMessages);
        socket.broadcast.to(data.roomId).emit('messages', newMessages);
      })
    });

    socket.on('edit-message', function(data) {
      RoomService.editMessage(data.roomId, data.message, function(err, newMessages) {
        if (err) {
          throw new Error(err);
        }

        RoomService.listMessages(data.roomId, function(messages) {
          socket.emit('messages', messages);
          socket.broadcast.to(data.roomId).emit('messages', messages);
        })
      })
    });
  });
}
