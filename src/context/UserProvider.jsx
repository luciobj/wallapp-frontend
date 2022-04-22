import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';
import { authUser } from '../helpers';

export default function UserProvider({ children }) {
  const [user, setUser] = useState('');
  const [isLogged, setIsLogged] = useState(false);

  const sessionUser = sessionStorage.getItem('user');

  useEffect(() => {
    if (sessionUser) {
      setUser(JSON.parse(sessionUser));
      setIsLogged(true);
    }
  }, []);

  async function logIn(credentials) {
    const { token } = await authUser(credentials);
    if (token) {
      setUser({ user: credentials.username, token });
      setIsLogged(true);
    }
  }

  async function logOut() {
    setUser('');
    setIsLogged(false);
  }

  const contextValue = {
    user,
    isLogged,
    logIn,
    logOut,
  };

  const value = useMemo(() => contextValue, [contextValue]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
