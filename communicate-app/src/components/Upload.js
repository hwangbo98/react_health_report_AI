import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    user_name: '',
    job: '',
    height: '',
    weight: '',
    age: '',
    purpose: '',
    total_body_water: '',
    protein: '',
    minerals: '',
    body_fat_mass: '',
    skeletal_muscle_mass: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://71nc4lk6kd.execute-api.ap-northeast-2.amazonaws.com/FINAL/real_upload_results', formData);
      console.log('Data uploaded successfully', response.data);
      alert('Data uploaded successfully');
    } catch (error) {
      console.error('Error uploading data', error);
      alert('Error uploading data');
    }
  };

  return (
    <div className="container">
      <h1>Upload Health Data</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="user_id"
          value={formData.user_id}
          onChange={handleChange}
          placeholder="ID"
          required
        />
        <input
          type="text"
          name="user_name"
          value={formData.user_name}
          onChange={handleChange}
          placeholder="이름"
          required
        />
        <input
          type="text"
          name="job"
          value={formData.job}
          onChange={handleChange}
          placeholder="직업"
          required
        />
        <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
          placeholder="키 (cm)"
          required
        />
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="몸무게 (kg)"
          required
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="나이"
          required
        />
        <input
          type="text"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          placeholder="운동 목적"
          required
        />
        <input
          type="number"
          name="total_body_water"
          value={formData.total_body_water}
          onChange={handleChange}
          placeholder="체수분 (%)"
          required
        />
        <input
          type="number"
          name="protein"
          value={formData.protein}
          onChange={handleChange}
          placeholder="단백질 (%)"
          required
        />
        <input
          type="number"
          name="minerals"
          value={formData.minerals}
          onChange={handleChange}
          placeholder="무기질 (%)"
          required
        />
        <input
          type="number"
          name="body_fat_mass"
          value={formData.body_fat_mass}
          onChange={handleChange}
          placeholder="체지방 (%)"
          required
        />
        <input
          type="number"
          name="skeletal_muscle_mass"
          value={formData.skeletal_muscle_mass}
          onChange={handleChange}
          placeholder="골격근량 (%)"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          placeholder="측정 날짜"
          required
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Upload;