import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

const styles = {
  body: {
    backgroundColor: '#f0f2f5',
    fontFamily: 'Roboto, sans-serif',
    margin: 0,
    padding: 0,
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    boxSizing: 'border-box',
  },
  faceDetection: {
    width: '100%',
    maxWidth: '800px',
    margin: 'auto',
    textAlign: 'center',
  },
  header: {
    width: '100%',
    maxWidth: '800px',
    textAlign: 'center',
    margin: 'auto',
    boxSizing: 'border-box',
  },
  h1: {
    color: '#344889',
    fontSize: '28px',
    margin: 0,
  },
  container: {
    width: '100%',
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '0 0 8px 8px',
    boxSizing: 'border-box',
  },
  videoWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: '640px',
    height: 0,
    paddingBottom: '75%',
    overflow: 'hidden',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    margin: 'auto',
  },
  videoCanvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '8px',
    objectFit: 'cover',
  },
  resultsContainer: {
    marginTop: '20px',
    width: '100%',
    textAlign: 'left',
  },
  person: {
    backgroundColor: '#ffffff',
    borderLeft: '4px solid #3498db',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  personHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  personP: {
    margin: '8px 0',
    fontSize: '14px',
    lineHeight: 1.5,
  },
  personPStrong: {
    color: '#2c3e50',
    fontWeight: 600,
  },
  message: {
    fontSize: '22px',
    width: '100%',
    maxWidth: '800px',
    margin: 'auto',
    color: '#2c3e50',
    fontWeight: 700,
    marginBottom: '15px',
    textAlign: 'center',
  },
  name: {
    color: '#3498db',
    fontSize: '18px',
  },
  timestamp: {
    color: '#7f8c8d',
    fontSize: '14px',
  },
  loading: {
    width: '100%',
    maxWidth: '800px',
    margin: '20px auto 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    padding: '20px',
  },
  loadingIcon: {
    width: '40px',
    height: '40px',
    border: '3px solid rgba(52, 152, 219, 0.2)',
    borderTop: '3px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingP: {
    marginTop: '12px',
    fontWeight: 500,
    color: '#2c3e50',
    fontSize: '14px',
    textAlign: 'center',
  },
};

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
        const response = await fetch('https://71nc4lk6kd.execute-api.ap-northeast-2.amazonaws.com/REAL_FINAL/attendance', {
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
    <div>
      <div style={styles.faceDetection}>
        <header style={styles.header}>
          <h1 style={styles.h1}>얼굴 인식 출석 체크</h1>
        </header>
        <div style={styles.container}>
          <div style={styles.videoWrapper}>
            <video ref={videoRef} autoPlay muted style={styles.videoCanvas} />
            <canvas ref={canvasRef} style={styles.videoCanvas} />
          </div>
          <div style={styles.resultsContainer}>
            {isLoading ? (
              <div style={styles.loading}>
                <div style={styles.loadingIcon}></div>
                <p style={styles.loadingP}>얼굴을 인식하는 중...</p>
              </div>
            ) : results.length > 0 ? (
              results.map((result, index) => (
                <div key={index} style={styles.person}>
                  <p style={styles.personP}>
                    {result.message}
                  </p>
                  {result.user_nickname && (
                    <p style={{ ...styles.personP, ...styles.personPStrong }}>
                      이름: {result.user_nickname}
                    </p>
                  )}
                  {result.timestamp && (
                    <p style={styles.timestamp}>
                      시간: {new Date(result.timestamp).toLocaleString()}
                    </p>
                  )}
                  {result.error && (
                    <p style={{ ...styles.personP, color: 'red' }}>
                      오류: {result.error}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <div style={styles.message}>
                <p>카메라에 얼굴을 비춰주세요.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  };
  
  export default FaceDetection;