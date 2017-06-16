import React from 'react';
import LoginForm from '../components/Login.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setToken } from '../auth/actions';
import { saveUser } from '../user/actions';

class LoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      errors: {},
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  processForm(event) {
    let _this = this;
    event.preventDefault();

    const {password, email} = this.state.user;
    const formData = {
      email: email,
      password: password
    };

    fetch('/login', {
    	method: 'post',
      body: JSON.stringify(formData),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
    }).then(response => {
      if (!response.ok) {
        response.json().then(response => {
          _this.setState({
            errors: {summary: response.message}
          });
        });
      } else {
        response.json().then(response => {
          this.props.setToken({token : response.token});
          this.props.saveUser({user : response.user});
          _this.props.history.push('/dashboard');
        });
      }
    }).catch((err) => {
      _this.setState({
        errors: {summary: err}
      });
    });
  }

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        tryClick={this.tryClick}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        user={this.state.user}
      />
    );
  }
}

export default connect(
  null,
  dispatch => ({
    ...bindActionCreators({ setToken, saveUser }, dispatch),
  })
)(LoginPage);
