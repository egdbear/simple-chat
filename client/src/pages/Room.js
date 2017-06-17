import React from 'react';
import { map } from 'lodash';
import io from 'socket.io-client';
import { connect } from 'react-redux';

import './Room.css';

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

  handleSubmit = event => {
    const body = event.target.value;

    if (event.keyCode === 13 && !!body) {
      const message = {
        body,
        from: 'Me'
      }

      const data = {
        roomId: this.props.match.params.id,
        message: {body, from: this.props.user.name}
      };

      this.setState({ messages: [message, ...this.state.messages] })
      this.socket.emit('message', data);
      event.target.value = '';
    }
  }

  render() {
    const messages = map(this.state.messages, (m, i) => {
      return (
        <div className={'message'} key={i}>
          <div className={'message-body'}>{m.body}</div>
          <div className={'message-from'}>{m.from}</div>
        </div>
      );
    });

    return (
      <div className={'room-wrapper'}>
        <div className={'heading'}>Room chat: </div>
        <div className={'conversation'}>
          <div className={'chat-wrapper'}>
          <div className={'chat'}>{messages}</div>
          </div>
          <div className={'input'}>
            <input type={"text"} placeholder={"Press enter to send a message"} onKeyUp={this.handleSubmit} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
  user: state.user
}))(Room);
