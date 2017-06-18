const path = require('path');
const express = require('express');
const port = process.env.PORT ? process.env.PORT : 3000;
const dist = path.join(__dirname, '../client/build');
const auth = require("./middleware/auth.js")();
const bodyparser = require('body-parser');

require('./models').connect('mongodb://localhost/simplechat');
const socketIo = require('socket.io');

const app = express();

app.use(bodyparser.json());

app.use(express.static('./client/build/'));
app.use(auth.initialize());

app.get('/', (req, res) => {
  res.sendFile(path.join(dist, 'index.html'));
});

app.use('/', require('./routes/login-route'));
app.use('/', require('./routes/register-route'));

const server = app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.info('Express is listening on port %s.', port);
});

/*
  Add rooms to db
*/

// const _ = require('lodash');
// const Room = require('./models/Room').roomModel();
// const rooms = [{name: 'Local'}, {name: 'Random'}, {name: 'SimpleChat'}, {name: 'CologneNight'}]
//
// _.map(rooms, function(i) {
//   const newRoom = new Room(i);
//   newRoom.save(function(err, nr) {
//     if (err) {
//       throw new Error(err);
//     }
//   })
// })


require('./sockets')(socketIo.listen(server));
