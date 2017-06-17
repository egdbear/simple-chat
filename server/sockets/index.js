const RoomService = require('../services/room-service');

module.exports = function (io) {
  io.on('connection', function (socket) {
    socket.on('list-rooms', function (data) {
      RoomService.listRooms(function(err, list){
        if (err) {
          throw new Error(err);
        }

        socket.emit('list-rooms', list);
      })
    });
  });

  io.of('/room').on('connection', function(socket) {
    socket.on('join', function(roomId) {
      socket.join(roomId);

      RoomService.listMessages(roomId, function(messages) {
        socket.emit('messages', messages);
      })
    });

    socket.on('disconnect', function(roomId) {
      socket.leave(roomId);
    });

    socket.on('message', function(data) {
      RoomService.saveMessage(data.roomId, data.message, data.userId, function(err, message) {
        if (err) {
          throw new Error(err);
        }

        socket.broadcast.to(data.roomId).emit('message', data.message);
      })
	  });
  });
}
