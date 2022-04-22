import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

export default function Header() {
  const [user, isLogged, logOut] = useContext(UserContext);
  const { username } = user;
  const navigate = useNavigate();

  function handleClick() {
    logOut();
    navigate('/');
  }

  return (
    <div>
      <h1>Post It Wall App</h1>
      { isLogged
        ? (
          <div>
            <span>{`Hello, ${username}`}</span>
            <button type="button" onClick={handleClick}>Log out</button>
          </div>
        )
        : (
          <div>
            <Link to="/signin">
              <span>Sign In</span>
            </Link>
            <Link to="/signup">
              <span>Sign Up</span>
            </Link>
          </div>
        )}
    </div>
  );
}
