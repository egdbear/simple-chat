const mongoose  = require('mongoose');

const MessagesSchema = new mongoose.Schema({
  user: { type: String},
  body: { type: String}
});

//todo use rooms from db

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  messages: [MessagesSchema]
});

RoomSchema.methods.listRooms = function(callback) {
  return callback(null, [{id: 1, name: 'TestRoom'}, {id: 2, name: 'Tech'}, {id: 3, name: 'Lounge'}])
}

var roomModel = mongoose.model('room', RoomSchema);
module.exports = roomModel;
