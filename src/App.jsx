import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import PostItProvider from './context/PostItProvider';
import UserProvider from './context/UserProvider';
import Router from './Router';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <PostItProvider>
          <Router />
        </PostItProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
