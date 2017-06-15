import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <div className={'form-wrapper'}>
    <Paper zDepth={3}>
      <div className={'login-form'}>
        <form action="/" onSubmit={onSubmit}>
          <h2 className="card-heading">Sign Up</h2>

          {errors.summary && <p className="error-message">{errors.summary}</p>}

          <div className="field-line">
            <TextField
              floatingLabelText="Name"
              name="name"
              errorText={errors.name}
              onChange={onChange}
              value={user.name}
            />
          </div>

          <div className="field-line">
            <TextField
              floatingLabelText="Email"
              name="email"
              errorText={errors.email}
              onChange={onChange}
              value={user.email}
            />
          </div>

          <div className="field-line">
            <TextField
              floatingLabelText="Password"
              type="password"
              name="password"
              onChange={onChange}
              errorText={errors.password}
              value={user.password}
            />
          </div>

          <div className="button-line">
            <RaisedButton type="submit" label="Create New Account" primary />
          </div>
        </form>
      </div>
    </Paper>
  </div>
);

export default SignUpForm;
