import React, { useState } from 'react';
import axios from 'axios';
import { ReactTyped as Typed } from 'react-typed';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #e0f7fa; /* 밝은 민트색 배경 */
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100vw;
  }
`;

const Container = styled.div`
  
  max-width: 1200px; /* 최대 너비를 1200px로 설정 */
  padding: 40px; /* 패딩을 40px로 늘림 */
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* 더 부드러운 그림자 */
  text-align: center;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  overflow-y: auto;
  
`;

const Title = styled.h1`
  color: #A1BBDE;
  font-size: 36px;
  margin-bottom: 30px;
`;

const Form = styled.form`
  gap: 20px;
  margin-bottom: 30px;
  width: 100%;
`;

const Input = styled.input`
  padding: 16px;
  font-size: 18px;
  border: 1px solid #b0bec5;
  border-radius: 6px;
  transition: border-color 0.3s;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: #00796b;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 16px;
  font-size: 18px;
  background-color: #A1BBDE;
  color: white;
  border: none;
  margin-top: 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    background-color: #344889;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Result = styled.div`
  background-color: #DAE6F4;
  padding: 30px;
  border-radius: 8px;
  border: 1px solid #DAE6F4;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #344889;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  display: inline-block;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

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
      const response = await axios.post('https://71nc4lk6kd.execute-api.ap-northeast-2.amazonaws.com/REAL_FINAL/upload_report', {
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
    <div>
      <GlobalStyle/>
      <Container>
        <Title>Health Data Analyzer</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={userId}
            onChange={handleInputChange}
            placeholder="User ID를 입력하세요"
          />
          <Button type="submit">분석하기</Button>
        </Form>
        {loading && <Loader />}
        {result && !loading && (
          <Result>
            <Typed
              strings={[result]}
              typeSpeed={30}
            />
          </Result>
        )}
      </Container>
    </div>
  );
};

export default HealthDataAnalyzer;