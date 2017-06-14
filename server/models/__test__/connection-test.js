/* global before */
const mongoose = require('mongoose');

describe('Database Tests', function() {
  before(function (done) {
    mongoose.connect('mongodb://localhost/simple-chat-test');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });
});
