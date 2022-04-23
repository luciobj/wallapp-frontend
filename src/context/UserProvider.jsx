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
      setUser({ user: sessionData.user, token: sessionData.token });
      setIsLogged(true);
    }
  }, []);

  async function logIn(credentials) {
    const { token } = await authUser(credentials);
    if (token) {
      setUser({ user: credentials.username, token });
      setIsLogged(true);
      sessionStorage.setItem('user', JSON.stringify({ user: credentials.username, token }));
    }
    return token;
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
