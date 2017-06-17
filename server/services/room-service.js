const Room = require('../models/Room');

module.exports = {
  saveMessages: function(roomId, message, cb) {
    Room.findByIdAndUpdate(roomId, {$push: message}, { safe: true, upsert: true, new: true },
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
  }
};
