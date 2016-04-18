import React from 'react';
import { Link } from 'react-router';

export default class Event extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, url } = this.props.event;
    return (
      <li>
        <div>
          <Link to={`/events/${url}`}
            onClick={$(".button-collapse").sideNav('hide')}
            className="collection-item"
            activeClassName="active">
            {title}
          </Link>
        </div>
      </li>
    )
  }
};
