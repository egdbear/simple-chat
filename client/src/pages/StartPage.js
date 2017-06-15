import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import './StartPage.css';

export default class StartPage extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to simple-chat app.</h2>
        </div>
        <p className="App-intro">
          App was build on top of nodejs (express), and react.
        </p>
      </div>
    );
  }
}
