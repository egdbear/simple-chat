import React from 'react';
import StartPage from '../pages/StartPage';
import About from '../pages/About';
import SignupPage from '../pages/SignupPage';
import Menu from '../menu';
import LoginPage from '../pages/LoginPage';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '../styles/fonts.css';
import '../styles/reset.css';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

export default (props) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router>
      <div>
        <Menu {...props} />
        <hr/>
        <Route exact path="/" component={StartPage} />
        <Route exact path="/about" component={About} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/login" component={LoginPage}  />
      </div>
    </Router>
  </MuiThemeProvider>
);
