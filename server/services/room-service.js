const Room = require('../models/Room');
const _ = require ('lodash');

module.exports = {
  saveMessage: function(roomId, message, userId, cb) {
    message.date = new Date();
    message.userId = userId;
    Room.findByIdAndUpdate(roomId, {$push: {messages: message}}, { safe: true, upsert: true, new: true },
      function(err) {
        if (err) {
          cb(err, null);
          throw new Error(err);
        }

        cb(null);
    });
  },
  listRooms: function(cb) {
    Room.find({}, function(err, list) {
      cb(null, list);
    })
  },
  listMessages: function(roomId, cb) {
    Room.findOne({'_id': roomId}, function(err, list) {
      if (err) {
        throw new Error(err);
      }

      cb(_.sortBy(list.messages, (o) => o.date));
    });
  }
};
