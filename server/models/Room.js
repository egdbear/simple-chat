const mongoose  = require('mongoose');

const RoomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    connections: { type: [{ userId: String, socketId: String }]}
});

var roomModel = mongoose.model('room', RoomSchema);

module.exports = roomModel;
