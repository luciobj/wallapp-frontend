import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import PostItContext from './PostItContext';

export default function PostItProvider({ children }) {
  const [PostIt, setPostIt] = useState({
    title: '',
    description: '',
  });

  const sessionPostIt = sessionStorage.getItem('postit');

  useEffect(() => {
    if (sessionPostIt) {
      setPostIt(JSON.parse(sessionPostIt));
    }
  }, []);

  const contextValue = {
    PostIt,
    setPostIt,
  };

  const value = useMemo(() => contextValue, [contextValue]);

  return (
    <PostItContext.Provider value={value}>
      {children}
    </PostItContext.Provider>
  );
}

PostItProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
