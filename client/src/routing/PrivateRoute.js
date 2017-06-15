import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import _ from 'lodash';

export default ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated() ? (<Component {...props} />)
    : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const isAuthenticated = () => {
  if (window && _.has(window.localStorage, 'state')) {
    const state = JSON.parse(window.localStorage.getItem('state'));
    return !_.isEmpty(_.get(state, 'auth.token'));
  }

  return false;
}
