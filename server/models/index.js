const mongoose = require('mongoose');

module.exports.connect = (uri) => {
  mongoose.connect(uri);

  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });

  mongoose.Promise = global.Promise;

  require('./User');
  require('./Room').roomModel();
  require('./Room').messagesModel();
}
