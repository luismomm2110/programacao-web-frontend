import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import './styles.css';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleCpfChange = (event) => {
    setCpf(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

const handleSubmit = (event) => {
  event.preventDefault();

  // Construct the payload
  const payload = {
    nome: username,
    email: email,
    cpf: cpf,
    password: password,
  };

  axios.post('http://127.0.0.1:5000/criar_paciente', payload)
    .then(response => {
      setError('');
      navigate('/consulta'); // Redirect to the main page
    })
    .catch(error => {
      console.error('There was an error!', error);
      const mensagem  = error.response.data;
      setError(mensagem);
    });
};
  return (
    <form onSubmit={handleSubmit} className="signUp">
      <h1>Crie sua conta</h1>
      <div>
        <label>Nome:</label>
        <input type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
        </div>
      <div>
        <label>CPF:</label>
        <input type="text" value={cpf} onChange={handleCpfChange} />
      </div>
      <div>
        <label>Senha:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button type="submit">Criar</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default SignupPage;
