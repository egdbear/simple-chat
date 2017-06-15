import _ from 'lodash';

export const isAuthenticated = () => {
  if (window && _.has(window.localStorage, 'state')) {
    const state = JSON.parse(window.localStorage.getItem('state'));
    return !_.isEmpty(_.get(state, 'auth.token'));
  }

  return false;
}
