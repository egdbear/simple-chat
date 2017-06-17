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

    socket.on('message', message => {
      socket.broadcast.emit('message', {
        body: message.body,
        from: socket.id.slice(8)
      })
    })
  });

  io.of('/room').on('connection', function(socket) {
    socket.on('join', function(roomId) {
      socket.join(roomId);
    });

    socket.on('disconnect', function(roomId) {
      socket.leave(roomId);
    });

    socket.on('message', function(data) {
      socket.broadcast.to(data.roomId).emit('message', data.message);
	  });
  });
}
