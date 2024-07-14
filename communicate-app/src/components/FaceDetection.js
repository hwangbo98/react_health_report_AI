import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import './FaceDetection.css';

const FaceDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [results, setResults] = useState([]);

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
        });
    };

    loadModels().then(startVideo);
  }, []);

  useEffect(() => {
    const sendImageToServer = async () => {
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
        const data = await response.json();
        displayResults(data);
      } catch (error) {
        console.error('Error:', error);
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
      }, 5000);
    };

    videoRef.current && videoRef.current.addEventListener('play', handleVideoPlay);
  }, []);

  const displayResults = (data) => {
    if (data.match) {
      setResults(data.results);
    } else {
      setResults([{ person: 'No matching faces found.', similarity: 0, status: '' }]);
    }
  };

  return (
    <div className="face-detection">
      <header>
        <h1>Webcam Face Detection</h1>
      </header>
      <div className="container">
        <div className="video-wrapper">
          <video ref={videoRef} autoPlay muted className="video" />
          <canvas ref={canvasRef} className="canvas" />
        </div>
      </div>
      <div id="results">
        {results.map((result, index) => (
          <div key={index} className="person">
            <p><strong>Name:</strong> {result.person}</p>
            <p><strong>Similarity:</strong> {result.similarity.toFixed(2)}%</p>
            <p><strong>Status:</strong> {result.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaceDetection;