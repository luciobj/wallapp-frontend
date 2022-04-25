import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import UserContext from '../../context/UserContext';
import './style.css';

export default function Header() {
  const { user, isLogged, logOut } = useContext(UserContext);
  const { user: username } = user;
  const navigate = useNavigate();

  const handleClick = () => {
    logOut();
    navigate('/');
  };

  return (
    <div className="header">
      <Link to="/" className="link header-title-container">
        <img src="tsl-logo.png" alt="logo" className="header-logo" />
        <h2 className="header-title">Wall App</h2>
      </Link>
      { isLogged
        ? (
          <div>
            <span>{`Hello, ${username}`}</span>
            <Button
              variant="text"
              onClick={handleClick}
              className="link"
            >
              Log Out
            </Button>
          </div>
        )
        : (
          <div>
            <Button
              variant="text"
            >
              <Link to="/signin" className="link">
                Sign In
              </Link>
            </Button>
            <Button
              variant="text"
            >
              <Link to="/signup" className="link">
                Sign Up
              </Link>
            </Button>
          </div>
        )}
    </div>
  );
}
