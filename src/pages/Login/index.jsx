import { TextField, Button, Alert } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '../../components/Header';
import UserContext from '../../context/UserContext';
import './style.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [fetchError, setFetchError] = useState('');
  const { isLogged, logIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    if (target.name === 'username') {
      setUsername(target.value);
    }
    if (target.name === 'password') {
      setPassword(target.value);
    }
  };

  const verifyInputs = () => {
    const minPasswordLength = 6;
    if (username.length < 1) {
      setUsernameError('Username is required');
    } else {
      setUsernameError('');
    }
    if (password.length < minPasswordLength) {
      setPasswordError('Passwords must be at least 6 characters');
    } else {
      setPasswordError('');
    }
    if (username.length > 0 && password.length >= minPasswordLength) {
      return true;
    }
    return false;
  };

  const handleClick = async () => {
    if (!verifyInputs()) {
      return;
    }
    const credentials = {
      username,
      password,
    };
    const auth = await logIn(credentials);
    if (auth.error) {
      setFetchError(auth.error);
      return;
    }
    navigate('/', { replace: true });
  };

  useEffect(() => {
    if (isLogged) {
      navigate('/', { replace: true });
    }
  }, []);

  useEffect(() => {
    if (username !== '') {
      setUsernameError('');
    }
    if (password !== '') {
      setPasswordError('');
    }
  }, [username, password]);

  return (
    <div className="login-container">
      <Header />
      <div className="login-content">
        <form className="login-form">
          <h1>Login</h1>
          <TextField
            name="username"
            label="Username"
            variant="filled"
            value={username}
            onChange={handleChange}
            error={usernameError !== ''}
            helperText={usernameError}
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
            margin="normal"
            size="small"
          />
          <Button
            variant="contained"
            onClick={handleClick}
            className="login-button"
          >
            Sign In
          </Button>
        </form>
      </div>
      {
        fetchError !== '' && (
          <Alert severity="error">{fetchError}</Alert>
        )
      }
    </div>
  );
}
