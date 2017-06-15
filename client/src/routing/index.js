import React from 'react';
import StartPage from '../pages/StartPage';
import About from '../pages/About';
import Dashboard from '../pages/Dashboard';
import SignupPage from '../pages/SignupPage';
import Menu from '../menu';
import PrivateRoute from './PrivateRoute';
import LoginPage from '../pages/LoginPage';
import Logout from '../pages/Logout';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';

import '../styles/fonts.css';
import '../styles/reset.css';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

class Routes extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router>
          <div>
            <Menu />
            <Route exact path="/" component={StartPage} />
            <Route path="/about" component={About} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/login" component={LoginPage}  />
            <Route path="/logout" component={Logout}  />
            <PrivateRoute path="/dashboard" component={Dashboard} />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
};

export default connect(
  (state) => ({
    token: state.auth.token
  })
)(Routes)
