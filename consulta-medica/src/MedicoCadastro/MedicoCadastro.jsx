import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import './styles.css';

export const MedicoCadastro = () => {
  const [username, setUsername] = useState('');
  const [crm, setCrm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleCrmChange = (event) => {
    setCrm(event.target.value);
  };

const handleSubmit = (event) => {
  event.preventDefault();

  // Construct the payload
  const payload = {
    nome: username,
    crm: crm,
  };

  axios.post('http://127.0.0.1:5000/medicos', payload)
    .then(response => {
      setError('');
        console.log('MedicoCadastro successful:', response.data);
        //naviate to medicos/:id/consultas
        navigate(`/medicos/${response.data.id}`);
    })
    .catch(error => {
      console.error('There was an error!', error);
      const mensagem  = error.response.data;
      setError(mensagem);
    });
};
  return (
    <form onSubmit={handleSubmit} className="signUp">
      <h1>Cadastre um médico</h1>
      <div>
        <label>Nome:</label>
        <input type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        <label>CRM:</label>
        <input type="text" value={crm} onChange={handleCrmChange} />
      </div>
      <button type="submit">Criar</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
