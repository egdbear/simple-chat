import React from 'react';
import io from 'socket.io-client';
import { isEmpty } from 'lodash';
import Room from './Room';

export default class CheckRoom extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isEmpty: true };
  }

  componentDidMount() {
    this.socket = io('/room');
    const props = this.props;
    const roomId = this.props.match.params.id;
    const _this = this;

    this.socket.emit('check-rooms', roomId);

    this.socket.on('empty-rooms', function(room) {
      if (isEmpty(room)) {
        return props.history.push('/dashboard');
      }

      _this.setState({isEmpty: false, roomName: room.name});
    });
  }

  render() {
    console.log(this.props.user);
    const Comp = this.state.isEmpty ? null : <Room roomName={this.state.roomName} {...this.props} />;
    return Comp;
  }
}
