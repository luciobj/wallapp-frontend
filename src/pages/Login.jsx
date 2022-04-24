import { TextField, Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '../components/Header';
import UserContext from '../context/UserContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [hidden, alterHidden] = useState(true);
  const { isLogged, logIn } = useContext(UserContext);
  const navigate = useNavigate();
  const TWO_SECONDS = 2000;

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
    const token = logIn(credentials);
    if (token.length < 1) {
      setErrorMessage('Failed to login, please try again');
      alterHidden(false);
      setTimeout(() => {
        alterHidden(true);
      }, TWO_SECONDS);
      return;
    }
    navigate('/', { replace: true });
  };

  useEffect(() => {
    if (isLogged) {
      navigate('/', { replace: true });
    }
  }, []);

  return (
    <div className="main-container">
      <Header />
      <div className="login-form">
        <form>
          <h1>Login</h1>
          <TextField
            name="username"
            label="Username"
            variant="outlined"
            value={username}
            onChange={handleChange}
            error={usernameError !== ''}
            helperText={usernameError}
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
          />
          <Button
            variant="contained"
            onClick={handleClick}
          >
            Sign In
          </Button>
        </form>
      </div>
      <div hidden={hidden}>
        <span>
          {errorMessage}
        </span>
      </div>
    </div>
  );
}
