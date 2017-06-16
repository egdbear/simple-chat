import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

class Menu extends React.PureComponent {
  render() {
    return (
      <Link to="/">
        <AppBar
          title="Simple Chat"
          iconElementRight={this.props.token !== null ? <Logged /> : <Login />}
          showMenuIconButton={false}
          className={'title'}
        />
      </Link>
    );
  }
}

const Logged = (props) => (
  <div className={'menu'}>
    <Link to={'/dashboard'}><FlatButton {...this.props} label="Rooms" /></Link>
    <Link to={'/profile'}><FlatButton {...this.props} label="Profile" /></Link>
    <Link to={'/logout'}><FlatButton {...this.props} label="Logout" /></Link>
  </div>
);

class Login extends React.Component {
  render() {
    return (
      <div>
        <Link to={'/signup'}><FlatButton {...this.props} label="Signup" /></Link>
        <Link to={'/login'}><FlatButton {...this.props} label="Login" /></Link>
      </div>
    );
  }
}

export default connect(
  state => ({
    token: state.auth.token
  })
)(Menu);
