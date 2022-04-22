import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '../components/Header';
import UserContext from '../context/UserContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [hidden, alterHidden] = useState(true);
  const { isLogged, logIn } = useContext(UserContext);
  const navigate = useNavigate();
  const TWO_SECONDS = 2000;

  function handleChange({ target }) {
    if (target.name === 'username') {
      setUsername(target.value);
    }
    if (target.name === 'password') {
      setPassword(target.value);
    }
  }

  function verifyInputs() {
    const minPasswordLength = 6;
    if (username.length < 1) {
      setErrorMessage('Username is required');
      alterHidden(false);
      setTimeout(() => {
        alterHidden(true);
      }, TWO_SECONDS);
      return false;
    }
    if (password.length < minPasswordLength) {
      setErrorMessage('Passwords must be at least 6 characters');
      alterHidden(false);
      setTimeout(() => {
        alterHidden(true);
      }, TWO_SECONDS);
      return false;
    }
    return true;
  }

  async function handleClick() {
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
    sessionStorage.setItem('user', { username, token });
    navigate('/home', { replace: true });
  }

  useEffect(() => {
    if (isLogged) {
      navigate('/home', { replace: true });
    }
  }, []);

  return (
    <div className="main-container">
      <Header />
      <div>
        <div hidden={hidden}>
          <span>
            {errorMessage}
          </span>
        </div>
        <form>
          <h1>Login</h1>
          <span>Username</span>
          <input
            name="username"
            type="username"
            placeholder="NeyTheBoy"
            value={username}
            onChange={handleChange}
          />
          <span>Password</span>
          <input
            name="password"
            type="password"
            placeholder="******"
            value={password}
            onChange={handleChange}
          />
          <button type="button" onClick={handleClick}>Sign In</button>
        </form>
      </div>
    </div>
  );
}
