import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeToken } from '../auth/actions'

class Logout extends React.PureComponent {
  componentDidMount(){
    this.props.removeToken();
    this.props.history.push('/');
  }
  render() {
    return null;
  }
}

export default connect(
  null,
  dispatch => ({
    ...bindActionCreators({ removeToken }, dispatch),
  })
)(Logout);
