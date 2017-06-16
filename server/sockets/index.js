const Room = require('../models/Room');

module.exports = function (io) {
  const room = new Room();

  io.on('connection', function (socket) {
    socket.on('list-rooms', function (data) {
      room.listRooms(function(err, rooms) {
        socket.emit('list-rooms', rooms);
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
