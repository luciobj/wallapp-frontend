import { TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { postUser } from '../../helpers';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [password2Error, setPassword2Error] = useState('');
  const [error, setError] = useState('');
  const [hidden, alterHidden] = useState(true);
  const [success, setSuccess] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const TWO_SECONDS = 2000;

  const verifyUsername = () => {
    if (username.length < 1) {
      setUsernameError('Username is required');
    } else {
      setUsernameError('');
      return true;
    }
    return false;
  };

  const verifyEmail = () => {
    const regex = /\S+@\S+\.\S+/;
    if (email.length < 1) {
      setEmailError('Email is required');
    } else if (!email.match(regex)) {
      setEmailError('Email is not valid');
    } else {
      setEmailError('');
      return true;
    }
    return false;
  };

  const verifyPasswords = () => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else if (password !== passwordConfirmation) {
      setPassword2Error('Passwords do not match');
    } else {
      setPasswordError('');
      setPassword2Error('');
      return true;
    }
    return false;
  };

  const verifyInputs = () => {
    if (verifyUsername() && verifyEmail() && verifyPasswords()) {
      return true;
    }
    return false;
  };

  const resetStates = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setPasswordConfirmation('');
    setError('');
    setSuccess(false);
  };

  const handleChange = ({ target }) => {
    if (target.name === 'username') {
      setUsername(target.value);
    } else if (target.name === 'email') {
      setEmail(target.value);
    } else if (target.name === 'password') {
      setPassword(target.value);
    } else if (target.name === 'passwordConfirmation') {
      setPasswordConfirmation(target.value);
    }
  };

  const handleClick = async () => {
    if (verifyInputs()) {
      const newUser = {
        username,
        email,
        password,
        password2: passwordConfirmation,
      };
      const post = await postUser(newUser);
      if (post.id) {
        setSuccess(false);
        setDisabled(true);
        setTimeout(() => {
          resetStates();
          navigate('/');
        }, TWO_SECONDS);
      } else {
        setError(post.error);
        alterHidden(false);
        setTimeout(() => {
          alterHidden(true);
        }, TWO_SECONDS);
      }
    }
  };

  return (
    <div className="main-container">
      <Header />
      <div className="main-content">
        <form className="register-form">
          <h1>Register</h1>
          <TextField
            name="username"
            label="Username"
            variant="outlined"
            value={username}
            onChange={handleChange}
            error={usernameError !== ''}
            helperText={usernameError}
            disabled={disabled}
            margin="normal"
            size="small"
          />
          <TextField
            name="email"
            label="email@email.com"
            variant="outlined"
            value={email}
            onChange={handleChange}
            error={emailError !== ''}
            helperText={emailError}
            disabled={disabled}
            margin="normal"
            size="small"
          />
          <TextField
            name="password"
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={handleChange}
            error={passwordError !== ''}
            helperText={passwordError}
            disabled={disabled}
            margin="normal"
            size="small"
          />
          <TextField
            name="password"
            type="password"
            label="Confirm Password"
            variant="outlined"
            value={passwordConfirmation}
            onChange={handleChange}
            error={password2Error !== ''}
            helperText={password2Error}
            disabled={disabled}
            margin="normal"
            size="small"
          />
          <Button
            variant="contained"
            onClick={handleClick}
            className="login-button"
          >
            Sign up
          </Button>
        </form>
      </div>
      <div hidden={hidden}>
        <span>
          {error}
        </span>
      </div>
      <div hidden={success}>
        <span>
          Success! You are now registered
        </span>
      </div>
    </div>
  );
}
