const mongoose  = require('mongoose');
const _ = require('lodash');

const RoomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    connections: { type: [{ userId: String, socketId: String }]}
});

RoomSchema.methods.listRooms = function(callback) {
  return callback(null, [{id: 1, name: 'TestRoom'}, {id: 2, name: 'Tech'}, {id: 3, name: 'Lounge'}])
}

const messages =  [
  {id: 1, messages:[{id: 1, message: 'test'}, {id: 2, message: 'test2'}], roomId: 1},
  {id: 2, messages:[{id: 34, message: 'some awkward'}, {id: 35, message: 'ldldldl'}], roomId: 2},
  {id: 3, messages:[{id: 43, message: 'owowoowow'}, {id: 44, message: 'owowowowowo'}], roomId: 3},
];

RoomSchema.methods.listMessages = function(roomId, callback) {
  return callback(null, _.find(messages, {roomId: roomId}));
}

var roomModel = mongoose.model('room', RoomSchema);
module.exports = roomModel;
