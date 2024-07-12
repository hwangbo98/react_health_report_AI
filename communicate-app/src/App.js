
// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// const HealthDataAnalyzer = () => {
//   const [userId, setUserId] = useState('');
//   const [result, setResult] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e) => {
//     setUserId(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await axios.post('https://71nc4lk6kd.execute-api.ap-northeast-2.amazonaws.com/STAGE_1/upload_report', {
//         user_id: userId,
//       });
//       setResult(response.data.response);
//     } catch (error) {
//       console.error('Error fetching data', error);
//       setResult('데이터를 가져오는 중 오류가 발생했습니다.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Health Data Analyzer</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={userId}
//           onChange={handleInputChange}
//           placeholder="User ID를 입력하세요"
//         />
//         <button type="submit">분석하기</button>
//       </form>
//       {loading && <div className="loader"></div>}
//       {result && !loading && (
//         <div className="result" dangerouslySetInnerHTML={{ __html: result }}></div>
//       )}
//     </div>
//   );
// };

// export default HealthDataAnalyzer;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Upload from './components/Upload';
import HealthDataAnalyzer from './components/HealthDataAnalyzer';
import FaceDetection from './components/FaceDetection';
import './HealthDataAnalyzer.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/analyze" element={<HealthDataAnalyzer />} />
          <Route path="/face-detection" element={<FaceDetection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
