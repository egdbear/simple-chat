import React from 'react';
import { map } from 'lodash';
import io from 'socket.io-client';

class Room extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {messages: []};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.socket = io('/room');
    const roomId = this.props.match.params.id;

    this.socket.emit('join', roomId);

    this.socket.on('message', message => {
      this.setState({ messages: [message, ...this.state.messages] })
    });

    this.socket.on('connect', () => {
      this.socket.emit('room', roomId);
    });
  }

  componentWillUnmount() {
    const roomId = this.props.match.params.id;
    this.socket.emit('disconnect', roomId);
  }

  handleSubmit = e => {
    const body = e.target.value;
    if (e.keyCode === 13 && !!body) {
      const message = {
        body,
        from: 'Me'
      }

      const data = {
        roomId: this.props.match.params.id,
        message: message
      };

      this.setState({ messages: [message, ...this.state.messages] })
      this.socket.emit('message', data);
      e.target.value = '';
    }
  }

  render() {
    const messages = map(this.state.messages, (m, i) => {
      return <div key={i}>{m.from}: {m.body}</div>
    });

    return (
      <div className={'room-wrapper'}>
        <div className={'heading'}>Room chat: </div>
        <input type={'text'} placeholder={'Enter message'} onKeyUp={this.handleSubmit} />
        {messages}
      </div>
    );
  }
}

export default Room;
