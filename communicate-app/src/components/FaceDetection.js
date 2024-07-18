import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import './FaceDetection.css';

const FaceDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');
      await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
    };

    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => {
          videoRef.current.srcObject = stream;
        })
        .catch(err => {
          console.error("Error accessing webcam: ", err);
          setResults([{ message: '웹캠 접근 오류', error: err.toString() }]);
        });
    };

    loadModels().then(startVideo);
  }, []);

  useEffect(() => {
    const sendImageToServer = async () => {
      setIsLoading(true);
      const captureCanvas = document.createElement('canvas');
      captureCanvas.width = videoRef.current.videoWidth;
      captureCanvas.height = videoRef.current.videoHeight;
      captureCanvas.getContext('2d').drawImage(videoRef.current, 0, 0, captureCanvas.width, captureCanvas.height);
      const dataUrl = captureCanvas.toDataURL('image/jpeg');
      const base64Image = dataUrl.split(',')[1];

      try {
        const response = await fetch('https://71nc4lk6kd.execute-api.ap-northeast-2.amazonaws.com/Integration/attendance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ image: base64Image })
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error:', error);
        setResults([{ message: '서버 통신 오류', error: error.toString() }]);
      } finally {
        setIsLoading(false);
      }
    };

    const handleVideoPlay = () => {
      const displaySize = { width: videoRef.current.videoWidth, height: videoRef.current.videoHeight };
      faceapi.matchDimensions(canvasRef.current, displaySize);

      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions()
          .withFaceDescriptors();

        if (detections.length > 0) {
          console.log('얼굴 감지됨');
          sendImageToServer();
        } else {
          console.log('얼굴 감지되지 않음');
        }

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const context = canvasRef.current.getContext('2d');
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
      }, 10000);
    };

    if (videoRef.current) {
      videoRef.current.addEventListener('play', handleVideoPlay);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('play', handleVideoPlay);
      }
    };
  }, []);

  return (
    <div className="face-detection">
      <header className="app-header">
        <h1>얼굴 인식 출석 체크</h1>
      </header>
      <div className="container">
        <div className="video-wrapper">
          <video ref={videoRef} autoPlay muted className="video" />
          <canvas ref={canvasRef} className="canvas" />
        </div>
        <div className="results-container">
          {isLoading ? (
            <div className="message loading">
              <div className="loading-icon"></div>
              <p>얼굴을 인식하는 중...</p>
            </div>
          ) : results.length > 0 ? (
            results.map((result, index) => (
              <div key={index} className="message result">
                <p className="result-message">{result.message}</p>
                {result.user_nickname && <p className="result-name">이름: {result.user_nickname}</p>}
                {result.timestamp && <p className="result-time">시간: {new Date(result.timestamp).toLocaleString()}</p>}
                {result.error && <p className="result-error">오류: {result.error}</p>}
              </div>
            ))
          ) : (
            <div className="message info">
              <p>카메라에 얼굴을 비춰주세요.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaceDetection;