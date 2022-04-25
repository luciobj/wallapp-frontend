import React from 'react';
import Header from '../../components/Header';
import './style.css';

export default function NotFound() {
  return (
    <div className="notfound-container">
      <Header />
      <div className="notfound-content">
        <h1>Page not found :/</h1>
      </div>
    </div>
  );
}
