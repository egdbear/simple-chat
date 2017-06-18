const Room = require('../models/Room').roomModel();
const _ = require ('lodash');
var mongoose = require('mongoose');

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
  },
  editMessage(roomId, message, cb) {
    Room.findOneAndUpdate({'_id': roomId, 'messages._id': message.messageId },
      {
        "$set": {
            "messages.$.body": message.body
      }
    },
    function(err, room) {
      cb(null);
    })
  },
  removeMessage(roomId, message, cb) {
    Room.findOne({'_id': roomId}, function(err, room) {
      if (err) {
        return cb(err, null);
      }

      room.messages.id(message.messageId).remove(function(err) {
        room.save();
        cb(null, room.messages);
      });
    })
  },
  getRoom(roomId, cb) {
    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return cb(null, []);
    }

    Room.findOne({'_id': roomId}, function(err, room) {
      if (err) {
        return cb(err, null);
      }

      cb(null, room);
    })
  }
};
