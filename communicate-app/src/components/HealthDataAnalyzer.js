import React, { useState } from 'react';
import axios from 'axios';
import { ReactTyped as Typed } from 'react-typed';
import '../HealthDataAnalyzer.css';

const HealthDataAnalyzer = () => {
  const [userId, setUserId] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setUserId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://71nc4lk6kd.execute-api.ap-northeast-2.amazonaws.com/Integration/upload_report', {
        user_id: userId,
      });
      setResult(response.data.response);
    } catch (error) {
      console.error('Error fetching data', error);
      setResult('데이터를 가져오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Health Data Analyzer</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userId}
          onChange={handleInputChange}
          placeholder="User ID를 입력하세요"
        />
        <button type="submit">분석하기</button>
      </form>
      {loading && <div className="loader"></div>}
      {result && !loading && (
        <div className="result">
          <Typed
            strings={[result]}
            typeSpeed={30}
          />
        </div>
      )}
    </div>
  );
};

export default HealthDataAnalyzer;