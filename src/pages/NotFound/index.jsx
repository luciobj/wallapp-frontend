import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

export default function NotFound() {
  return (
    <div className="main-container">
      <Header />
      <h1>Page not found :/</h1>
      <Link to="/">Go to home page</Link>
    </div>
  );
}
