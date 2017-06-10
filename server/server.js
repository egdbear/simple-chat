const routes = require('./routes');

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');


const app = express();

const port = process.env.PORT ? process.env.PORT : 3000;
const dist = path.join(__dirname, '../client/build');

mongoose.connect('mongodb://localhost/simplechat');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Mongoose successfully connected.')
});

app.use(express.static(dist));

app.get('/', (req, res) => {
  res.sendFile(path.join(dist, 'index.html'));
});

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.info('Express is listening on port %s.', port);
});

routes(app);
