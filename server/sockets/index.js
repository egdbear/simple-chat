const Room = require('../models/Room');

module.exports = function (io) {
  const room = new Room();
  io.on('connection', function (socket) {
    socket.on('list-rooms', function (data) {
      room.listRooms(function(err, rooms) {
        socket.emit('updated-rooms-list', rooms);
      })
    });
  });
}
