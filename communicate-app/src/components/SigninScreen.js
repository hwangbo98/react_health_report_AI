import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SigninScreen = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.id === id);

    if (userExists) {
      alert('User already exists');
    } else {
      users.push({ id: id, password });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Signup successful');
      navigate('/');
    }
  };

  const styles = {
    body: {
      backgroundColor: '#DDE1E6',
      margin: 0,
      fontFamily: 'Arial, sans-serif',
    },
    signupContainer: {
      width: '300px',
      margin: '100px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#DDE1E6',
      textAlign: 'center',
    },
    logo: {
      width: '200px',
      marginBottom: '20px',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    inputGroup: {
      marginBottom: '15px',
    },
    input: {
      width: 'calc(100% - 10px)',
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '3px',
    },
    buttonGroup: {
      marginTop: '20px',
    },
    button: {
      width: '100%',
      padding: '8px',
      border: 'none',
      borderRadius: '3px',
      backgroundColor: '#6890cb',
      color: '#fff',
      fontSize: '16px',
      cursor: 'pointer',
      marginBottom: '10px',
    },
    buttonHover: {
      backgroundColor: '#697077',
    },
  };

  return React.createElement(
    'div',
    { style: styles.signupContainer },
    React.createElement('img', {
      src: `${process.env.PUBLIC_URL}/DSTJ_logo.png`,
      alt: 'Logo',
      style: styles.logo,
    }),
    React.createElement('h2', { style: styles.heading }, 'Sign up'),
    React.createElement(
      'form',
      null,
      React.createElement(
        'div',
        { style: styles.inputGroup },
        React.createElement('input', {
          type: 'text',
          value: id,
          onChange: (e) => setId(e.target.value),
          placeholder: 'ID',
          style: styles.input,
        })
      ),
      React.createElement(
        'div',
        { style: styles.inputGroup },
        React.createElement('input', {
          type: 'password',
          value: password,
          onChange: (e) => setPassword(e.target.value),
          placeholder: 'Password',
          style: styles.input,
        })
      ),
      React.createElement(
        'div',
        { style: styles.buttonGroup },
        React.createElement(
          'button',
          {
            type: 'button',
            onClick: handleSignup,
            style: styles.button,
            onMouseOver: (e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor,
            onMouseOut: (e) => e.target.style.backgroundColor = styles.button.backgroundColor,
          },
          'Signup'
        ),
        React.createElement(
          'button',
          {
            type: 'button',
            onClick: () => navigate('/'),
            style: styles.button,
            onMouseOver: (e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor,
            onMouseOut: (e) => e.target.style.backgroundColor = styles.button.backgroundColor,
          },
          'Login'
        )
      )
    )
  );
};

export default SigninScreen;
