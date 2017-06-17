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
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.addDate = this.addDate.bind(this);
    this.matchId = this.matchId.bind(this);
  }

  componentDidMount() {
    this.socket = io('/room');
    const roomId = this.props.match.params.id;

    this.socket.emit('join', roomId);

    this.socket.on('message', message => {
      this.setState({ messages: [...this.state.messages, message] })
    });

    this.socket.on('messages', messages => {
      this.setState({ messages: [...messages, ...this.state.messages] })
    });

    this.socket.on('connect', () => {
      this.socket.emit('room', roomId);
    });

    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
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
        from: 'Me',
        date: new Date(),
        userId: this.props.user._id
      }

      const data = {
        roomId: this.props.match.params.id,
        message: {body, from: this.props.user.name},
        userId: this.props.user._id,
        me: true
      };

      this.setState({ messages: [...this.state.messages, message] })
      this.socket.emit('message', data);
      event.target.value = '';
    }
  }

  scrollToBottom() {
    const scrollHeight = this.messageList.scrollHeight;
    const height = this.messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  matchId(message, userId) {
    return message.userId === userId;
  }

  addDate(date) {
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    const m = minutes < 10 ? '0': '' +  minutes;
    return `${hours}:${m}`;
  }

  render() {
    const messages = map(this.state.messages, (m, i) => {
      let style = {};
      const isFromMe = this.matchId(m, this.props.user._id) || m.me;

      if (isFromMe) {
        style = { textAlign: 'right' };
      }

      return (
        <div className={'message'} key={i}>
          <div className={'message-body'} style={style}>{m.body}</div>
          <div className={'message-from'} style={style}>{m.from}&nbsp; at {this.addDate(m.date)}</div>
        </div>
      );
    });

    return (
      <div className={'room-wrapper'}>
        <div className={'heading'}>Room chat: </div>
        <div className={'conversation'}>
          <div className={'chat-wrapper'}>
          <div className={'chat'} ref={(div) => { this.messageList = div;}}>{messages}</div>
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
