// import React, { useState } from 'react';
// import axios from 'axios';

// const UploadVer1 = () => {
//   const [formData, setFormData] = useState({
//     user_id: '',
//     user_name: '',
//     job: '',
//     height: '',
//     weight: '',
//     age: '',
//     purpose: '',
//     total_body_water: '',
//     protein: '',
//     minerals: '',
//     body_fat_mass: '',
//     skeletal_muscle_mass: '',
//     date: ''
//   });
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const fetchData = async () => {
//     setIsLoading(true);
//     setError('');
//     try {
//       const response = await axios.get('https://71nc4lk6kd.execute-api.ap-northeast-2.amazonaws.com/FINAL_6/upload_inbody');
      
//       const extractedData = JSON.parse(response.data.body).extracted_data;
//       const parsedData = JSON.parse(extractedData);

//       setFormData({
//         user_id: parsedData['회원번호'] || '',
//         user_name: '',  // 사용자 이름은 따로 입력받아야 할 수 있습니다.
//         job: '',
//         height: parsedData['신장'] || '',
//         weight: parsedData['체중'] || '',
//         age: parsedData['나이'] || '',
//         purpose: '',
//         total_body_water: parsedData['체수분'] || '',
//         protein: parsedData['단백질'] || '',
//         minerals: parsedData['무기질'] || '',
//         body_fat_mass: parsedData['체지방량'] || '',
//         skeletal_muscle_mass: parsedData['골격근량'] || '',
//         date: parsedData['측정날짜'] || ''
//       });
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError('데이터 가져오기 실패');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>헬스 데이터 업로드</h1>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {isLoading && <p>데이터를 불러오는 중...</p>}
      
//       <button onClick={fetchData} disabled={isLoading}>
//         데이터 가져오기
//       </button>

//       <form>
//         <input type="text" name="user_id" value={formData.user_id} onChange={handleChange} placeholder="ID" />
//         <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} placeholder="이름" />
//         <input type="text" name="job" value={formData.job} onChange={handleChange} placeholder="직업" />
//         <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="키 (cm)" />
//         <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="몸무게 (kg)" />
//         <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="나이" />
//         <input type="text" name="purpose" value={formData.purpose} onChange={handleChange} placeholder="운동 목적" />
//         <input type="number" name="total_body_water" value={formData.total_body_water} onChange={handleChange} placeholder="체수분 (%)" />
//         <input type="number" name="protein" value={formData.protein} onChange={handleChange} placeholder="단백질 (%)" />
//         <input type="number" name="minerals" value={formData.minerals} onChange={handleChange} placeholder="무기질 (%)" />
//         <input type="number" name="body_fat_mass" value={formData.body_fat_mass} onChange={handleChange} placeholder="체지방 (%)" />
//         <input type="number" name="skeletal_muscle_mass" value={formData.skeletal_muscle_mass} onChange={handleChange} placeholder="골격근량 (%)" />
//         <input type="date" name="date" value={formData.date} onChange={handleChange} placeholder="측정날짜" />
//       </form>
//     </div>
//   );
// };

// export default UploadVer1;


// import React, { useState } from 'react';

// const OcrComponent = () => {
//   const [formData, setFormData] = useState({
//     user_id: '',
//     height: '',
//     weight: '',
//     age: '',
//     total_body_water: '',
//     protein: '',
//     minerals: '',
//     body_fat_mass: '',
//     skeletal_muscle_mass: '',
//     date: ''
//   });
//   const [error, setError] = useState(null);

//   const fetchOcrData = async () => {
//     try {
//       const response = await fetch('https://71nc4lk6kd.execute-api.ap-northeast-2.amazonaws.com/FINAL_6/upload_inbody', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       const extractedData = JSON.parse(data.extracted_data);

//       setFormData({
//         user_id: extractedData.회원번호 || '',
//         height: extractedData.신장 || '',
//         weight: extractedData.체중 || '',
//         age: extractedData.나이 || '',
//         total_body_water: extractedData.체수분 || '',
//         protein: extractedData.단백질 || '',
//         minerals: extractedData.무기질 || '',
//         body_fat_mass: extractedData.체지방량 || '',
//         skeletal_muscle_mass: extractedData.골격근량 || '',
//         date: extractedData.측정날짜 || ''
//       });
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div>
//       <h1>OCR 데이터 가져오기</h1>
//       <button onClick={fetchOcrData}>데이터 가져오기</button>
//       {error && <p style={{ color: 'red' }}>Error: {error}</p>}
//       <form>
//         <input type="text" name="user_id" value={formData.user_id} onChange={handleChange} placeholder="ID" />
//         <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="신장 (cm)" />
//         <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="체중 (kg)" />
//         <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="나이" />
//         <input type="number" name="total_body_water" value={formData.total_body_water} onChange={handleChange} placeholder="체수분 (%)" />
//         <input type="number" name="protein" value={formData.protein} onChange={handleChange} placeholder="단백질 (%)" />
//         <input type="number" name="minerals" value={formData.minerals} onChange={handleChange} placeholder="무기질 (%)" />
//         <input type="number" name="body_fat_mass" value={formData.body_fat_mass} onChange={handleChange} placeholder="체지방량 (%)" />
//         <input type="number" name="skeletal_muscle_mass" value={formData.skeletal_muscle_mass} onChange={handleChange} placeholder="골격근량 (%)" />
//         <input type="date" name="date" value={formData.date} onChange={handleChange} placeholder="측정날짜" />
//       </form>
//     </div>
//   );
// };

// export default OcrComponent;
// import React, { useState } from 'react';
// import AWS from 'aws-sdk';
// import axios from 'axios';
// import './Upload_ver1.css';


// const OcrComponent = () => {
//   const [formData, setFormData] = useState({
//     user_id: '',
//     height: '',
//     weight: '',
//     age: '',
//     total_body_water: '',
//     protein: '',
//     minerals: '',
//     body_fat_mass: '',
//     skeletal_muscle_mass: '',
//     date: ''
//   });
//   const [error, setError] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [fileName, setFileName] = useState('');

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setError('파일을 선택하세요.');
//       return;
//     }

//     setLoading(true); // 로딩 시작

//     try {
//       const timestamp = new Date().getTime();
//       const fileName = `inbody_img/${timestamp}_${selectedFile.name}`;
//       setFileName(fileName);

//       const params = {
//         Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
//         Key: fileName,
//         Body: selectedFile,
//         ContentType: selectedFile.type
//       };

//       const s3 = new AWS.S3({
//         accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
//         region: process.env.REACT_APP_AWS_REGION
//       });

//       s3.upload(params, (err, data) => {
//         if (err) {
//           setError(`파일 업로드 오류: ${err.message}`);
//         } else {
//           setMessage('파일이 성공적으로 업로드되었습니다.');
//         }
//         setLoading(false); // 로딩 종료
//       });
//     } catch (err) {
//       console.error('파일 업로드 오류:', err);
//       setError(`파일 업로드 오류: ${err.message}`);
//       setLoading(false); // 로딩 종료
//     }
//   };

//   const fetchOcrData = async () => {
//     if (!fileName) {
//       setError('파일이 업로드되지 않았습니다.');
//       return;
//     }

//     try {
//       const response = await axios.post('https://71nc4lk6kd.execute-api.ap-northeast-2.amazonaws.com/FINAL_7/upload_inbody', {
//         file_name: fileName
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status !== 200) {
//         throw new Error(`Failed to fetch OCR data: ${response.statusText}`);
//       }

//       const data = response.data;
//       const extractedData = JSON.parse(data.extracted_data);

//       setFormData({
//         user_id: extractedData.회원번호 || '',
//         height: extractedData.신장 || '',
//         weight: extractedData.체중 || '',
//         age: extractedData.나이 || '',
//         total_body_water: extractedData.체수분 || '',
//         protein: extractedData.단백질 || '',
//         minerals: extractedData.무기질 || '',
//         body_fat_mass: extractedData.체지방량 || '',
//         skeletal_muscle_mass: extractedData.골격근량 || '',
//         date: extractedData.측정날짜 || ''
//       });
//     } catch (error) {
//       console.error('데이터 가져오기 오류:', error);
//       setError(`데이터 가져오기 오류: ${error.message}`);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div>
//       <h1>OCR 데이터 가져오기</h1>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload} disabled={loading}>파일 업로드</button>
      
//       {loading && <p>로딩중...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {message && <p style={{ color: 'green' }}>{message}</p>}
//       <form>
//         <input type="text" name="user_id" value={formData.user_id} onChange={handleChange} placeholder="ID" />
//         <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="신장 (cm)" />
//         <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="체중 (kg)" />
//         <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="나이" />
//         <input type="number" name="total_body_water" value={formData.total_body_water} onChange={handleChange} placeholder="체수분 (%)" />
//         <input type="number" name="protein" value={formData.protein} onChange={handleChange} placeholder="단백질 (kg)" />
//         <input type="number" name="minerals" value={formData.minerals} onChange={handleChange} placeholder="무기질 (kg)" />
//         <input type="number" name="body_fat_mass" value={formData.body_fat_mass} onChange={handleChange} placeholder="체지방량 (%)" />
//         <input type="number" name="skeletal_muscle_mass" value={formData.skeletal_muscle_mass} onChange={handleChange} placeholder="골격근량 (kg)" />
//         <input type="date" name="date" value={formData.date} onChange={handleChange} placeholder="측정날짜" />
//       </form>
//       <button onClick={fetchOcrData} disabled={loading}>데이터 가져오기</button>
//     </div>
//   );
// };

// export default OcrComponent;
import React, {useEffect, useState } from 'react';
import AWS from 'aws-sdk';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import './Upload_ver1.css';
import styled from "styled-components";
// import { useEffect, useState } from "react";

const Base = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const SliderObject = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  scroll-snap-align: start;
`;

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

  useEffect(() => {
    const handleWheel = (e) => {
      const currentSection = Math.floor(window.scrollY / window.innerHeight);
      if (e.deltaY > 0 && currentSection < 4) {
        window.scrollTo({
          top: (currentSection + 1) * window.innerHeight,
          behavior: "smooth",
        });
      } else if (e.deltaY < 0 && currentSection > 0) {
        window.scrollTo({
          top: (currentSection - 1) * window.innerHeight,
          behavior: "smooth",
        });
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);
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
      const response = await axios.post('https://71nc4lk6kd.execute-api.ap-northeast-2.amazonaws.com/FINAL_7/upload_inbody', {
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
      const response = await axios.post('https://71nc4lk6kd.execute-api.ap-northeast-2.amazonaws.com/FINAL_8/Inbody_To_DB', 
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
    <Base className="slider">
      <SliderObject>
        <FormContainer>
          <h1>데이터 가져오기</h1>
          <div className="file-input">
            <input id="file-upload" type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={loading}>파일 업로드</button>
          </div>
      {loading && <div className="loader-container"><ClipLoader color="#4CAF50" loading={loading} size={50} /></div>}
      {error && <p className="error">{error}</p>}
      {message && <p className="message">{message}</p>}
      <form>
        <div className="form-group">
          <label htmlFor="user_id">ID</label>
          <input type="text" name="user_id" value={formData.user_id} onChange={handleChange} placeholder="ID" />
        </div>
        <div className="form-group">
          <label htmlFor="sex">성별</label>
          <input type="text" name="sex" value={formData.sex} onChange={handleChange} placeholder="성별" />
        </div>
        <div className="form-group">
          <label htmlFor="job">직업</label>
          <input type="text" name="job" value={formData.job} onChange={handleChange} placeholder="직업" />
        </div>
        <div className="form-group">
          <label htmlFor="height">신장 (cm)</label>
          <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="신장 (cm)" />
        </div>
        <div className="form-group">
          <label htmlFor="weight">체중 (kg)</label>
          <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="체중 (kg)" />
        </div>
        <div className="form-group">
          <label htmlFor="age">나이</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="나이" />
        </div>
        <div className="form-group">
          <label htmlFor="total_body_water">체수분 (%)</label>
          <input type="number" name="total_body_water" value={formData.total_body_water} onChange={handleChange} placeholder="체수분 (%)" />
        </div>
        <div className="form-group">
          <label htmlFor="protein">단백질 (%)</label>
          <input type="number" name="protein" value={formData.protein} onChange={handleChange} placeholder="단백질 (%)" />
        </div>
        <div className="form-group">
          <label htmlFor="minerals">무기질 (%)</label>
          <input type="number" name="minerals" value={formData.minerals} onChange={handleChange} placeholder="무기질 (%)" />
        </div>
        <div className="form-group">
          <label htmlFor="body_fat_mass">체지방량 (%)</label>
          <input type="number" name="body_fat_mass" value={formData.body_fat_mass} onChange={handleChange} placeholder="체지방량 (%)" />
        </div>
        <div className="form-group">
          <label htmlFor="skeletal_muscle_mass">골격근량 (%)</label>
          <input type="number" name="skeletal_muscle_mass" value={formData.skeletal_muscle_mass} onChange={handleChange} placeholder="골격근량 (%)" />
        </div>
        <div className="form-group">
          <label htmlFor="purpose">운동 목적</label>
          <input type="text" name="purpose" value={formData.purpose} onChange={handleChange} placeholder="운동 목적" />
        </div>
        <div className="form-group">
          <label htmlFor="date">측정날짜</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} placeholder="측정날짜" />
        </div>
      </form>
      <div className="buttons">
        <button onClick={fetchOcrData} disabled={loading}>데이터 가져오기</button>
        <button onClick={handleSubmit} disabled={loading}>DB에 저장</button>
      </div>
      </FormContainer>
      </SliderObject>
    </Base>
  );
};

export default OcrComponent;