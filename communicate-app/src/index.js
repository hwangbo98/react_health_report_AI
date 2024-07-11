import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // CSS 파일이 있으면 가져옵니다.

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);