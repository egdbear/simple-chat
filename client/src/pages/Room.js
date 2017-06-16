import React from 'react';
import connect from '../connection';

const Room = (props) => {
  return (
    <div> this is room {props.name}</div>
  );
}

export default connect(Room);
