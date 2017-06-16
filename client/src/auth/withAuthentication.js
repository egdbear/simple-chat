import React from 'react';
import { isNull } from 'lodash';
import { connect } from 'react-redux';

export default (Component) => {
  class WrappedAuthentication extends React.Component {
    render() {
      const { history } = this.props;
      const { token } = this.props.auth;

      if (isNull(token)) {
        return <Redirect history={history} />
      }

      return <Component {...this.props}/>;
    }
  }

  return ConnectedAuthentication(WrappedAuthentication);
}

const ConnectedAuthentication = (Comp) => connect(
  state => ({
    auth: state.auth
  })
)(Comp)

class Redirect extends React.PureComponent {
  componentDidMount() {
    this.props.history.push('/login');
  }

  render() {
    return null;
  }
}
