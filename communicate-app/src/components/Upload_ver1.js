import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
  }

  #root {
    height: 100%;
  }
`;

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FileInput = styled.div`
  margin-bottom: 20px;

  input[type="file"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;

  label {
    flex: 0 0 100px;
    margin-right: 10px;
  }

  input {
    flex: 1;
    padding: 5px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 20px;
  border: none;
  background-color: #789CCD;
  color: white;
  cursor: pointer;
  margin-top: 10px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  &:hover {
    background-color: #344889;
  }
`;

const Error = styled.p`
  text-align: center;
  margin: 10px 0;
  color: red;
`;

const Message = styled.p`
  text-align: center;
  margin: 10px 0;
  color: green;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const OcrComponent = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    sex: '',
    height: '',
    weight: '',
    age: '',
    total_body_water: '',
    protein: '',
    minerals: '',
    body_fat_mass: '',
    skeletal_muscle_mass: '',
    date: '',
    purpose: '',
    job: '',
    number: '',
  });
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState('');

  // useEffect(() => {
  //   const handleWheel = (e) => {
  //     const currentSection = Math.floor(window.scrollY / window.innerHeight);
  //     if (e.deltaY > 0 && currentSection < 4) {
  //       window.scrollTo({
  //         top: (currentSection + 1) * window.innerHeight,
  //         behavior: "smooth",
  //       });
  //     } else if (e.deltaY < 0 && currentSection > 0) {
  //       window.scrollTo({
  //         top: (currentSection - 1) * window.innerHeight,
  //         behavior: "smooth",
  //       });
  //     }
  //   };

  //   window.addEventListener("wheel", handleWheel);
  //   return () => window.removeEventListener("wheel", handleWheel);
  // }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('파일을 선택하세요.');
      return;
    }

    setLoading(true); // 로딩 시작

    try {
      const timestamp = new Date().getTime();
      const fileName = `inbody_img/${timestamp}_${selectedFile.name}`;
      setFileName(fileName);

      const params = {
        Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
        Key: fileName,
        Body: selectedFile,
        ContentType: selectedFile.type
      };

      const s3 = new AWS.S3({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        region: process.env.REACT_APP_AWS_REGION
      });

      s3.upload(params, (err, data) => {
        if (err) {
          setError(`파일 업로드 오류: ${err.message}`);
        } else {
          setMessage('파일이 성공적으로 업로드되었습니다.');
        }
        setLoading(false); // 로딩 종료
      });
    } catch (err) {
      console.error('파일 업로드 오류:', err);
      setError(`파일 업로드 오류: ${err.message}`);
      setLoading(false); // 로딩 종료
    }
  };

  const fetchOcrData = async () => {
    if (!fileName) {
      setError('파일이 업로드되지 않았습니다.');
      return;
    }

    setLoading(true); // 로딩 시작

    try {
      const response = await axios.post('https://71nc4lk6kd.execute-api.ap-northeast-2.amazonaws.com/REAL_FINAL/upload_inbody', {
        file_name: fileName
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error(`Failed to fetch OCR data: ${response.statusText}`);
      }

      const data = response.data;
      const extractedData = JSON.parse(data.extracted_data);

      setFormData({
        user_id: extractedData.회원번호 || '',
        sex: extractedData.성별 || '',
        height: extractedData.신장 || '',
        weight: extractedData.체중 || '',
        age: extractedData.나이 || '',
        total_body_water: extractedData.체수분 || '',
        protein: extractedData.단백질 || '',
        minerals: extractedData.무기질 || '',
        body_fat_mass: extractedData.체지방량 || '',
        skeletal_muscle_mass: extractedData.골격근량 || '',
        date: extractedData.측정날짜 || '',
        purpose: extractedData.목적 || '',  // 추가된 부분
        job: extractedData.직업 || '',
      });
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
      setError(`데이터 가져오기 오류: ${error.message}`);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setMessage('');

    let formattedDate = formData.date;
    if (formData.date) {
      const dateParts = formData.date.split('.');
      if (dateParts.length === 3) {
        const year = dateParts[0].trim();
        const month = dateParts[1].trim().padStart(2, '0');
        const day = dateParts[2].trim().padStart(2, '0');
        formattedDate = `${year}-${month}-${day}`;
      }
    }

    if (!formattedDate) {
      setError('날짜를 입력해주세요.');
      setLoading(false);
      return;
    }

    const dataToSend = {
      ...formData,
      date: formattedDate,
      memberpk: formData.user_id
    };

    console.log('Sending data to server:', dataToSend);

    try {
      const response = await axios.post('https://71nc4lk6kd.execute-api.ap-northeast-2.amazonaws.com/REAL_FINAL/Inbody_To_DB', 
        dataToSend, 
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Server response:', response.data);

      if (response.status !== 200) {
        throw new Error(`Failed to save data: ${response.statusText}`);
      }

      setMessage('데이터가 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('데이터 저장 오류:', error);
      setError(`데이터 저장 오류: ${error.response?.data || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <GlobalStyle />
      {/* <Base className="slider">
        <SliderObject> */}
          <FormContainer>
            <h1>데이터 가져오기</h1>
            <FileInput>
              <input id="file-upload" type="file" onChange={handleFileChange} />
              <Button onClick={handleUpload} disabled={loading}>파일 업로드</Button>
              </FileInput>
            {loading && <LoaderContainer><ClipLoader color="#4CAF50" loading={loading} size={50} /></LoaderContainer>}
            {error && <Error>{error}</Error>}
            {message && <Message>{message}</Message>}
            <Form>
              <FormGroup>
                <label htmlFor="user_id">ID</label>
                <input type="text" name="user_id" value={formData.user_id} onChange={handleChange} placeholder="ID" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="sex">성별</label>
                <input type="text" name="sex" value={formData.sex} onChange={handleChange} placeholder="성별" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="job">직업</label>
                <input type="text" name="job" value={formData.job} onChange={handleChange} placeholder="직업" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="height">신장 (cm)</label>
                <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="신장 (cm)" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="weight">체중 (kg)</label>
                <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="체중 (kg)" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="age">나이</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="나이" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="total_body_water">체수분 (L)</label>
                <input type="number" name="total_body_water" value={formData.total_body_water} onChange={handleChange} placeholder="체수분 (L)" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="protein">단백질 (kg)</label>
                <input type="number" name="protein" value={formData.protein} onChange={handleChange} placeholder="단백질 (kg)" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="minerals">무기질 (kg)</label>
                <input type="number" name="minerals" value={formData.minerals} onChange={handleChange} placeholder="무기질 (kg)" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="body_fat_mass">체지방량 (kg)</label>
                <input type="number" name="body_fat_mass" value={formData.body_fat_mass} onChange={handleChange} placeholder="체지방량 (kg)" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="skeletal_muscle_mass">골격근량 (kg)</label>
                <input type="number" name="skeletal_muscle_mass" value={formData.skeletal_muscle_mass} onChange={handleChange} placeholder="골격근량 (kg)" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="purpose">운동 목적</label>
                <input type="text" name="purpose" value={formData.purpose} onChange={handleChange} placeholder="운동 목적" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="date">측정날짜</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} placeholder="측정날짜" />
              </FormGroup>
            </Form>
            <div className="buttons">
              <Button onClick={fetchOcrData} disabled={loading}>데이터 가져오기</Button>
              <Button onClick={handleSubmit} disabled={loading}>DB에 저장</Button>
            </div>
          </FormContainer>
        {/* </SliderObject> */}
      {/* </Base> */}
    </div>
  );
};

export default OcrComponent;