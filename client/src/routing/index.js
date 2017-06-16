import React from 'react';
import StartPage from '../pages/StartPage';
import About from '../pages/About';
import Dashboard from '../pages/Dashboard';
import SignupPage from '../pages/SignupPage';
import Menu from '../menu';
import LoginPage from '../pages/LoginPage';
import Logout from '../pages/Logout';
import Room from '../pages/Room';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import withAuthentication from '../auth/withAuthentication';

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
              <Route exact path="/dashboard" component={withAuthentication(Dashboard)} />
              <Route path="/dashboard/:id" component={withAuthentication(Room)} />
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
