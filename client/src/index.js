import ReactDOM from 'react-dom';
import React from 'react';
import Router from './routing';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import store from './store';

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
);
