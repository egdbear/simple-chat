const mongoose  = require('mongoose');

const RoomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    connections: { type: [{ userId: String, socketId: String }]}
});

RoomSchema.methods.listRooms = function(callback) {
  return callback(null, [{id: 1, name: 'TestRoom'}, {id: 2, name: 'Tech'}, {id: 3, name: 'Lounge'}])
}

var roomModel = mongoose.model('room', RoomSchema);
module.exports = roomModel;
