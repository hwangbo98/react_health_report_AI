import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Upload from './components/Upload';
import UploadVer1 from './components/Upload_ver1';
import HealthDataAnalyzer from './components/HealthDataAnalyzer';
import FaceDetection from './components/FaceDetection';
import S3Upload from './components/S3Upload';  // S3Upload 컴포넌트 추가
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/upload-ver1" element={<UploadVer1 />} />
            <Route path="/s3-upload" element={<S3Upload />} />  {/* S3Upload 경로 추가 */}
            <Route path="/analyze" element={<HealthDataAnalyzer />} />
            <Route path="/face-detection" element={<FaceDetection />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;