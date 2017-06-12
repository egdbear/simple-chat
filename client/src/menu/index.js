import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/signup">Sign up</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
  );
}
