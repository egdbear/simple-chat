const path = require('path');
const express = require('express');
const port = process.env.PORT ? process.env.PORT : 3000;
const dist = path.join(__dirname, '../client/build');
const auth = require("./middleware/auth.js")();
const bodyparser = require('body-parser');

require('./models').connect('mongodb://localhost/simplechat');

const app = express();

app.use(bodyparser.json());

app.use(express.static('./client/build/'));
app.use(auth.initialize());

app.get('/', (req, res) => {
  res.sendFile(path.join(dist, 'index.html'));
});

app.use('/', require('./routes/login-route'));
app.use('/', require('./routes/user-route'));
app.use('/', require('./routes/register-route'));

const server = app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.info('Express is listening on port %s.', port);
});

const io = require('socket.io').listen(server);

io.on('connection', function (socket) {
  socket.on('user connected', function (data) {
    console.log(data);
  });
});
