import React from 'react';
import { connect } from 'react-redux';
import './Profile.css';

class Profile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {edit: false}
  }

  render() {
    return (
      <div className='profile-form'>
        <h2 className={'heading'}>Profile</h2>
          <div className={'text'}>Hi {this.props.user.name}, howdy?</div>
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.user
  })
)(Profile)
