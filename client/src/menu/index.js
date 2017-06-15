import React from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import './Menu.css';
import { connect } from 'react-redux';

class Menu extends React.PureComponent {
  render() {
    return (
      <div className={'menu'}>
        {this.props.token === null && <NavButton url={'/login'} label={'Login'} /> }
        {this.props.token === null && <NavButton url={'/signup'} label={'Signup'} /> }
        {this.props.token !== null && <NavButton url={'/logout'} label={'Logout'} /> }
      </div>
    );
  }
}

const NavButton = (props) => {
  return (
    <div className={'button'}><Link to={props.url}><RaisedButton primary={true} label={props.label}/></Link></div>
  );
};

export default connect(
  state => ({
    token: state.auth.token
  })
)(Menu);
