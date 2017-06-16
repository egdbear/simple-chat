import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './styles.css';

const LoginForm = ({
  onSubmit,
  onChange,
  tryClick,
  errors,
  user
}) => (
  <div className={'form-wrapper'}>
    <Paper zDepth={3}>
      <div className={'login-form'}>
        <form action="/" onSubmit={onSubmit}>
          <h2 className="card-heading">Login</h2>

          {errors.summary && <p className="error-message">{errors.summary}</p>}

          <div>
            <TextField
              floatingLabelText="Email"
              name="email"
              onChange={onChange}
              value={user.email}
            />
          </div>

          <div>
            <TextField
              floatingLabelText="Password"
              type="password"
              name="password"
              onChange={onChange}
              value={user.password}
            />
          </div>

          <div className="button-line">
            <RaisedButton type="submit" label="Log in" primary />
          </div>
        </form>
      </div>
    </Paper>
  </div>
);


export default LoginForm;
