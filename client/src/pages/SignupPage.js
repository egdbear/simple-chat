import React from 'react';
import SignUpForm from '../components/Signup.js';

export default class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  processForm(event) {
    let _this = this;
    event.preventDefault();
    const formData = this.state.user;
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    fetch('/register', {
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
        return;
      }

      _this.props.history.push('/login');
    }).catch((err) => {
      _this.setState({
        errors: {summary: err}
      });
    });
  }

  render() {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }
}
