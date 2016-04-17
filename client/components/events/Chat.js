import React from 'react';
import Message from './Message.js';

const Chat = (props) => (
  <div className="col sm12 m8 l8">
    <ul className="collection">
      {props.messages.map((message, i) => <Message {...message} key={i}/>)}
    </ul>
  </div>
);

Chat.propTypes = {
  messages: React.PropTypes.array,
};

export default Chat;
