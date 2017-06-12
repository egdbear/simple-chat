import ReactDOM from 'react-dom';
import React from 'react';
import Router from './routing';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(
  <Router />,
  document.getElementById('root')
);
