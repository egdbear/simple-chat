import React from 'react';
import { map } from 'lodash';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import './Room.css';

class Room extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {messages: [], roomId: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.addDate = this.addDate.bind(this);
    this.matchId = this.matchId.bind(this);
  }

  componentDidMount() {
    this.socket = io('/room');
    const roomId = this.props.match.params.id;

    this.socket.emit('join', roomId);

    this.setState({roomId: roomId});

    this.socket.on('message', message => {
      this.setState({ messages: [...this.state.messages, message] })
    });

    this.socket.on('messages', messages => {
      this.setState({ messages: [...messages] })
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
        userId: this.props.user._id,
        me: true
      }

      const data = {
        roomId: this.props.match.params.id,
        message: {body, from: this.props.user.name},
        userId: this.props.user._id,
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

      const from = this.props.isFromMe ? 'Me' : m.from;

      return (
        <div className={'message'} key={i}>
          <MessageBody style={style} body={m.body} roomId={this.state.roomId}
          isFromMe={isFromMe} messageId={m._id} socket={this.socket}/>
          <div className={'message-from'} style={style}>{from}&nbsp; at {this.addDate(m.date)}</div>
        </div>
      );
    });

    return (
      <div className={'room-wrapper'}>
        <div className={'heading'}>{this.props.roomName}</div>
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

class MessageBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {edit: false}
    this.editMessage = this.editMessage.bind(this);
    this.removeMessage = this.removeMessage.bind(this);
  }

  editMessage = event => {
    const body = event.target.value;
    if (event.keyCode === 13 && !!body) {
      const data = {
        message: {
          body,
          messageId: this.props.messageId,
        },
        roomId: this.props.roomId
      };

      this.props.socket.emit('edit-message', data);
      this.setState({edit: false})
    }
  }

  removeMessage() {
    const props = this.props;
    const data = { message: {messageId: props.messageId}, roomId: this.props.roomId};
    this.props.socket.emit('remove-message', data);
  }

  render() {
    if (!this.state.edit) {
      return (
        <div className={'message-body'} style={this.props.style}>
          {this.props.body}
          {this.props.isFromMe && <div className={'edit'} onClick={() => this.setState({edit: true})}/> }
          {this.props.isFromMe && <div className={'remove'} onClick={this.removeMessage}/> }
        </div>
      );
    }

    return (
      <div className={'message-body'} style={{textAlign: 'right'}}>
        <input type={'text'} placeholder={this.props.body} onKeyUp={this.editMessage} />
      </div>
    )
  }
}

class CheckRoom extends React.PureComponent {
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

      console.log(room.name);

      _this.setState({isEmpty: false, roomName: room.name});
    });
  }

  render() {
    const Comp = this.state.isEmpty ? null : <Room roomName={this.state.roomName} {...this.props} />;
    return Comp;
  }
}

export default connect(
  state => ({
  user: state.user
}))(CheckRoom);
