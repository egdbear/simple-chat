const mongoose  = require('mongoose');

const MessagesSchema = new mongoose.Schema({
  from: {type: String},
  body: {type: String},
  userId: {type: String},
  date: {type: Date}
})

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true }
  },
  messages: [MessagesSchema]
});

var roomModel = mongoose.model('room', RoomSchema);
var messagesModel = mongoose.model('messages', MessagesSchema);

module.exports = {
  roomModel: function() {
    return roomModel;
  },
  messagesModel: function() {
    return messagesModel;
  }
}
