import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import UserContext from '../context/UserContext';
import tslLogo from '../assets/tsl-logo.png';

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
      <div className="header-title-container">
        <Link to="/">
          <img src={tslLogo} alt="logo" className="header-logo" />
          <h2 className="header-title">Wall App</h2>
        </Link>
      </div>
      { isLogged
        ? (
          <div>
            <span>{`Hello, ${username}`}</span>
            <Button
              variant="text"
              onClick={handleClick}
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
              <Link to="/signin">
                Sign In
              </Link>
            </Button>
            <Button
              variant="text"
            >
              <Link to="/signup">
                Sign Up
              </Link>
            </Button>
          </div>
        )}
    </div>
  );
}
