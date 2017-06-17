const mongoose  = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true }
  },
  messages: [{
    from: {type: String},
    body: {type: String},
    date: {type: Date}
  }]
});

var roomModel = mongoose.model('room', RoomSchema);
module.exports = roomModel;
