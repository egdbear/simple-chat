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
You should manually add rooms to database by uncommenting piece of code inside `server/server.js` file.


### Run mongo in background
`sudo mongod --fork --logpath /var/log/mongod.log`

### Flow
You should create an user with credentials of email and password.
Then you will be able to login and see list of rooms which are previously added from `server.js`.
To edit or remove message you've sent, you should hover your message.  
