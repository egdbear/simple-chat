import ReactDOM from 'react-dom';
import React from 'react';
import Router from './routing';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import configureStore from './store';

injectTapEventPlugin();

console.log(configureStore());

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router />
  </Provider>,
  document.getElementById('root')
);
