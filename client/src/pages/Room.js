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
    this.socket = io('/');
      this.socket.on('message', message => {
        this.setState({ messages: [message, ...this.state.messages] })
    })
  }

  handleSubmit = e => {
    const body = e.target.value;
    if (e.keyCode === 13 && !!body) {
      const message = {
        body,
        name: 'Me'
      }

      this.setState({ messages: [message, ...this.state.messages] })
      this.socket.emit('message', message);
      e.target.value = '';
    }
  }

  render() {
    const messages = map(this.state.messages, (m, i) => {
      return <div key={i}>{m.from}: {m.body}</div>
    });

    return (
      <div>
      <input type={'text'} placeholder={'Enter message'} onKeyUp={this.handleSubmit} />
        {messages}
      </div>
    );
  }
}

export default Room;
