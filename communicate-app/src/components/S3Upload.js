import React, { useState } from 'react';
import axios from 'axios';

const S3Upload = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setUploading(true);

    if (selectedFile) {
      try {
        const response = await axios.post('https://71nc4lk6kd.execute-api.ap-northeast-2.amazonaws.com/FINAL_6/s3_upload', {
          fileName: selectedFile.name,
          fileType: selectedFile.type
        });

        const { url } = response.data;

        console.log('Presigned URL:', url);

        await axios.put(url, selectedFile, {
          headers: {
            'Content-Type': selectedFile.type
          }
        });

        console.log('File uploaded successfully');
        setUploading(false);

        if (typeof onUploadSuccess === 'function') {
          onUploadSuccess(selectedFile.name);
        } else {
          console.warn('onUploadSuccess is not a function');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        setError('파일 업로드 실패');
        setUploading(false);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default S3Upload;