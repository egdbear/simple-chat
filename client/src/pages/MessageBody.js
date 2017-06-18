import React from 'react';

export default class MessageBody extends React.Component {
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
        <button onClick={() => this.editMessage}>Save</button>
      </div>
    )
  }
}
