import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';
import { authUser } from '../helpers';

export default function UserProvider({ children }) {
  const [user, setUser] = useState('');
  const [isLogged, setIsLogged] = useState(false);

  const sessionData = sessionStorage.getItem('user');

  useEffect(() => {
    if (sessionData) {
      const sessionUser = JSON.parse(sessionData);
      setUser({ user: sessionUser.user, token: sessionUser.token });
      setIsLogged(true);
    }
  }, []);

  async function logIn(credentials) {
    const response = await authUser(credentials);
    if (response.error) {
      return response;
    }
    setUser({ user: credentials.username, token: response.token });
    setIsLogged(true);
    sessionStorage.setItem('user', JSON.stringify({ user: credentials.username, token: response.token }));
    return response;
  }

  async function logOut() {
    setUser('');
    setIsLogged(false);
    sessionStorage.clear();
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
