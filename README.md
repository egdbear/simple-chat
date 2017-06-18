# Simple chat

### Installation

Simple chat requires [Node.js](https://nodejs.org/) v6+ to run.

Install the dependencies and start the server.

```sh
$ npm install
$ npm run build
$ npm start
```

### Fill the database
You should manually add rooms to database by uncommenting piece of code inside `server.js` file in root.


### Run mongo in background
`sudo mongod --fork --logpath /var/log/mongod.log`
