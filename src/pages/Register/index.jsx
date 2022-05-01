import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { postUser } from '../../helpers';
import './style.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [password2Error, setPassword2Error] = useState('');
  const [fetchError, setFetchError] = useState('');
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const delayToClearHelperText = 2000;
  const delayToClearError = 4000;

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
    setFetchError('');
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (verifyInputs()) {
      const newUser = {
        username,
        email,
        password,
        password2: passwordConfirmation,
      };
      setFetchError('');
      setDisabled(true);
      const post = await postUser(newUser);
      if (post.id) {
        setFetchError('');
        setSuccess(true);
        setTimeout(() => {
          resetStates();
          navigate('/signin');
        }, delayToClearHelperText);
      } else {
        setDisabled(false);
        setFetchError(post.error);
        if (post.error === '') {
          setFetchError('Please enter a valid email');
        }
        setTimeout(() => {
          setFetchError('');
        }, delayToClearError);
      }
    }
  };

  const resetError = (value, callback) => {
    if (value !== '') {
      callback('');
    }
  };

  useEffect(() => {
    resetError(username, setUsernameError);
    resetError(email, setEmailError);
    resetError(password, setPasswordError);
    resetError(passwordConfirmation, setPassword2Error);
  }, [username, email, password, passwordConfirmation]);

  return (
    <div className="register-container">
      <Header />
      <div className="register-content">
        <form className="register-form" onSubmit={handleSubmit}>
          <h1>Register</h1>
          <TextField
            name="username"
            label="Username"
            variant="filled"
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
            variant="filled"
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
            variant="filled"
            value={password}
            onChange={handleChange}
            error={passwordError !== ''}
            helperText={passwordError}
            disabled={disabled}
            margin="normal"
            size="small"
          />
          <TextField
            name="passwordConfirmation"
            type="password"
            label="Confirm Password"
            variant="filled"
            value={passwordConfirmation}
            onChange={handleChange}
            error={password2Error !== ''}
            helperText={password2Error}
            disabled={disabled}
            margin="normal"
            size="small"
          />
          {
            disabled ? (
              <Button variant="contained">
                Loading...
              </Button>
            ) : (
              <Button
                variant="contained"
                type="submit"
                className="login-button"
              >
                Sign up
              </Button>
            )
          }
        </form>
      </div>
      {
        fetchError !== '' && (
          <Alert severity="error">{fetchError}</Alert>
        )
      }
      { success && (
        <Alert severity="success">
          Success! You are now registered
        </Alert>
      ) }
    </div>
  );
}
