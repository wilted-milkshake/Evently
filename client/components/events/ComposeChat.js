import React from 'react';

const ComposeChat = (props) => {
  function getChatMessage(e) {
    e.preventDefault();
    const msg = document.querySelector('input').value;
    props.submitHandler(msg);
    props.blurHandler();
  }

  return (
    <li className="collection-item avatar compose-chat">
      <form name="chat" encType="multipart/form-data" action="" onSubmit={getChatMessage}>
        <i className="material-icons circle">perm_identity</i>
        <span className="author">me</span>
        <button type="submit" className="secondary-content" onClick={getChatMessage}>
        <i className="material-icons">send</i>
        </button>
        <input
          type="text"
          name="message"
          placeholder="Enter a message"
          autoFocus="true"
        />
      </form>
    </li>
  );
};

ComposeChat.propTypes = {
  blurHandler: React.PropTypes.func,
  submitHandler: React.PropTypes.func,
};

export default ComposeChat;
// onBlur={props.blurHandler}
