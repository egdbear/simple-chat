import React from 'react';
import Rooms from '../components/Rooms';

const io = require('socket.io-client')
const socket = io();

class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { rooms: []};
  }

  componentDidMount() {
    const _this = this;
    socket.emit('list-rooms');
    socket.on('list-rooms', function(data) {
      _this.setState({rooms: data});
    });
  }

  render() {
    const {history} = this.props;
    return (
      <div>
        <h2 style={{textAlign: 'center', padding:'0 1em'}}>Room list</h2>
        <Rooms rooms={this.state.rooms} history={history} />
      </div>
    );
  }
}

export default Dashboard;
