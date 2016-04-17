import React from 'react';
import Message from './Message';
import ComposeChat from './ComposeChat';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isComposingChat: false,
    };
  }

  toggleComposingChatState() {
    this.setState({ isComposingChat: !this.state.isComposingChat });
  }

  render() {
    return (
      <div className="col sm12 m8 l8 chat">
        <div className="teal lighten-2 white-text section">
          <h4 className="left">Chat</h4>
          <a
            className="btn-floating btn-med waves-effect waves-light yellow write-btn"
            onClick={() => this.toggleComposingChatState()}
          >
            <i className="material-icons">mode_edit</i>
          </a>
        </div>
        <ul className="collection">
          {this.state.isComposingChat ?
            <ComposeChat
              blurHandler={this.toggleComposingChatState.bind(this)}
              submitHandler={this.props.sendChat}
            /> :
            <span></span>}
          {this.props.messages
            .slice(-20)
            .reverse()
            .map((message, i) => <Message {...message} key={message._id} />)}
        </ul>
      </div>
    );
  }
}

Chat.propTypes = {
  messages: React.PropTypes.array,
  sendChat: React.PropTypes.func,
};

export default Chat;
