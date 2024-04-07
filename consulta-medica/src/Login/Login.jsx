// src/Login/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const Login = () => {
  // State to store the email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Configuring the data to be sent in the request
    const userData = {
      email: email,
      password: password,
    };

    try {
      // Sending a POST request to the server endpoint
      const response = await axios.post('http://127.0.0.1:5000/login', userData);
      console.log('Login successful:', response.data);
      // Save the token in local storage
        localStorage.setItem('token', response.data.token);
      // Handle further actions here such as redirecting the user or storing the received token
        navigate('/consulta'); // Redirect to the consulta page
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      // Handle errors here, such as notifying the user of an incorrect login attempt
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
