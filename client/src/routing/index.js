import React from 'react';
import StartPage from '../pages/StartPage';
import About from '../pages/About';
import Menu from '../menu';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

export default (props) => (
  <Router>
    <div>
      <Menu {...props} />
      <hr/>
      <Route exact path="/" component={StartPage}/>
      <Route exact path="/about" component={About}/>
    </div>
  </Router>
);
