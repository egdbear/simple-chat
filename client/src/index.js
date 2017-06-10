import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.css';
import { Provider } from 'react-redux';

import { createStore } from 'redux';

const store = createStore(()=> null);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
