import React from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import './Menu.css';

export default class extends React.PureComponent {
  render() {
      return (
        <div className={'menu'}>
          <NavButton url={'/login'} label={'Login'} />
          <NavButton url={'/signup'} label={'Signup'} />
          <NavButton url={'/logout'} label={'Logout'} />
        </div>
      );
    }
  }

  const NavButton = (props) => {
    return (
    <div className={'button'}><Link to={props.url}><RaisedButton primary={true} label={props.label}/></Link></div>
    );
  };
