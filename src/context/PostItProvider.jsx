import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import PostItContext from './PostItContext';

export default function PostItProvider({ children }) {
  const [PostItForm, setPostItForm] = useState({
    id: 0,
    title: '',
    description: '',
  });

  const sessionPostIt = sessionStorage.getItem('postit');

  useEffect(() => {
    if (sessionPostIt) {
      setPostItForm(JSON.parse(sessionPostIt));
    }
  }, []);

  const contextValue = {
    PostItForm,
    setPostItForm,
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
