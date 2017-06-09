const path = require('path');
const express = require('express');

const app = express();

const port = process.env.PORT ? process.env.PORT : 3000;
const dist = path.join(__dirname, 'client/build');

app.use(express.static(dist));

app.get('*', (req, res) => {
  res.sendFile(path.join(dist, 'index.html'));
});

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.info('Express is listening on port %s.', port); 
});
