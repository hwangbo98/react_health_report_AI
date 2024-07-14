// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Health Data App</div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/upload">Upload</Link></li>
          <li><Link to="/analyze">Analyze</Link></li>
          <li><Link to="/face-detection">Face Detection</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;