import React from 'react';
import Message from './Message.js';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isComposingChat: false,
    };
  }

  render() {
    return (
      <div className="col sm12 m8 l8 chat">
        <div className="teal lighten-2 white-text section">
          <h4 className="left">Chat</h4>
          <a
            className="btn-floating btn-med waves-effect waves-light yellow write-btn"
            onClick={''}
          >
            <i className="material-icons">mode_edit</i>
          </a>
        </div>
        <ul className="collection">
          {this.props.messages.map((message, i) => <Message {...message} key={i} />)}
        </ul>
      </div>
    );
  }
}

Chat.propTypes = {
  messages: React.PropTypes.array,
};

export default Chat;
