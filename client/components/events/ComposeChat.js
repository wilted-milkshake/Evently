import React from 'react';

const ComposeChat = (props) => (
  <li className="collection-item avatar">
    <i className="material-icons circle">perm_identity</i>
    <span className="author">me</span>
    <textarea placeholder="Enter a message" autoFocus="true"></textarea>
    <a href="#!" className="secondary-content"><i className="material-icons">send</i></a>
  </li>
);

// ComposeChat.propTypes = {
//   // author: React.PropTypes.string,
//   // text: React.PropTypes.string,
// };

export default ComposeChat;
