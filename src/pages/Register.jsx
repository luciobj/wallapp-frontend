import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { postUser } from '../helpers';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [hidden, alterHidden] = useState(true);
  const [success, setSuccess] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const TWO_SECONDS = 2000;

  function verifyInputs() {
    const regex = /\S+@\S+\.\S+/;
    const minPasswordLength = 6;
    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      alterHidden(false);
      setTimeout(() => {
        alterHidden(true);
      }, TWO_SECONDS);
    } else if (!email.match(regex)) {
      setError('Email is not valid');
      alterHidden(false);
      setTimeout(() => {
        alterHidden(true);
      }, TWO_SECONDS);
    } else if (password.length < minPasswordLength) {
      setError('Password must be at least 6 characters');
      alterHidden(false);
      setTimeout(() => {
        alterHidden(true);
      }, TWO_SECONDS);
    } else {
      return true;
    }
    return false;
  }

  function resetStates() {
    setUsername('');
    setEmail('');
    setPassword('');
    setPasswordConfirmation('');
    setError('');
    setSuccess(false);
  }

  function handleChange({ target }) {
    if (target.name === 'username') {
      setUsername(target.value);
    } else if (target.name === 'email') {
      setEmail(target.value);
    } else if (target.name === 'password') {
      setPassword(target.value);
    } else if (target.name === 'passwordConfirmation') {
      setPasswordConfirmation(target.value);
    }
  }

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
      <div>
        <form>
          <h1>Sign Up</h1>
          <span>Username</span>
          <input
            name="username"
            placeholder="myuser"
            value={username}
            onChange={handleChange}
            disabled={disabled}
          />
          <span>Email</span>
          <input
            name="email"
            type="email"
            placeholder="email@email.com"
            value={email}
            onChange={handleChange}
            disabled={disabled}
          />
          <span>Password</span>
          <input
            name="password"
            type="password"
            placeholder="*****"
            value={password}
            onChange={handleChange}
            disabled={disabled}
          />
          <span>Confirm password</span>
          <input
            name="passwordConfirmation"
            type="password"
            placeholder="*****"
            value={passwordConfirmation}
            onChange={handleChange}
            disabled={disabled}
          />
          <button type="button" onClick={handleClick}>Register</button>
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
