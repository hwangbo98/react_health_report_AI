import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome to the DSTJ</h1>
      <nav>
        <ul>
          <li>
            <Link to="/upload">Upload Data</Link>
          </li>
          <li>
            <Link to="/upload-ver1">Upload Data Ver1</Link>
          </li>
          <li>
            <Link to="/s3-upload">Upload to S3</Link>
          </li>
          <li>
            <Link to="/analyze">Analyze Data</Link>
          </li>
          <li>
            <Link to="/face-detection">출석 관리</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;