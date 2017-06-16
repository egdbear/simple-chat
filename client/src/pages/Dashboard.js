import React from 'react';
const io = require('socket.io-client')
const socket = io()

class Dashboard extends React.PureComponent {
  componentDidMount() {
    socket.emit('user connected', {test: 'test'});
  }

  render() {
    return (
      <div>this is dashboard only visible if you are logged in.</div>
    );
  }
}

export default Dashboard;
