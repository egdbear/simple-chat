import React from 'react';
import LoginForm from '../components/Login.js';

class LoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    this.state = {
      errors: {},
      successMessage,
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.tryClick = this.tryClick.bind(this);
  }

  tryClick(event) {
    event.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open('post', '/user');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success
        console.log('SUCESS');
        console.log(xhr.response);

      } else {
        // failure
        console.log('fail');
        console.log(xhr.response);
      }
    });

    const formData = {
      'jwtSecret': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.VNUlJbm8C29XLfpVMqzBXocI26lT4qvmhKHKBjYfHrk"
    };

    xhr.send(JSON.stringify(formData));
  }


  processForm(event) {
    event.preventDefault();

    const email = this.state.user.email;
    const password = this.state.user.password;

    const formData = {
      email: email,
      password: password
    };

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/login');
    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success
        console.log('SUCESS');
        // change the component-container state
        this.setState({
          errors: {}
        });

        // save the token
        // Auth.authenticateUser(xhr.response.token);


        // change the current URL to /
        // this.context.router.replace('/');
      } else {
        // failure

        console.log(xhr.response);

        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });


    xhr.send(JSON.stringify(formData));
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

export default LoginPage;
