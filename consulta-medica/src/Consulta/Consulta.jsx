import React, {useEffect, useState} from 'react';

import './consultas.css';
import {useAuth} from '../AuthContext'
import {useNavigate} from "react-router-dom";

const getTodayFormattedForInput = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, '0');
    const day = `${today.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;  // YYYY-MM-DD
  };


export const Consulta = () => {
    const  {user, _} = useAuth()
    const navigate = useNavigate()

    const handleHome = () => {
        navigate('/home');
    }

      const [isModalOpen, setIsModalOpen] = useState(false);
      const [selectedDate, setSelectedDate] = useState(getTodayFormattedForInput());
      const [doctors, setDoctors] = useState([]);
      const [selectedDoctor, setSelectedDoctor] = useState(null);
      const openModal = (doctorId) => {
          setSelectedDoctor(doctorId);
          setIsModalOpen(true);
      }
      const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/medicos')
        .then((response) => response.json())
        .then((data) => setDoctors(data));
    }, []);

  const onMarcarConsulta = () => {

    fetch('http://127.0.0.1:5000/consultas', {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify(
        {
            horario: selectedDate,
            medico_id: selectedDoctor,
        }
      ),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
      console.error('Error:', error);
    });
    closeModal();
  }

  return (
    <div className={'consultas'}>
        <header>
          <h1>Médicos</h1>
        </header>
        <button onClick={handleHome}>Home</button>
        {doctors.length === 0 ? <p>Não há médicos disponíveis</p> :
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            {doctor.nome}
            <button onClick={() => openModal(doctor.id)}>Marcar Consulta</button>
          </li>
        ))}
      </ul>
        }
          {isModalOpen && (
        <div className={'datePicker'}>
          <h2>Escolha uma data</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <div>
            <button onClick={closeModal}>Fechar</button>
            <button onClick={onMarcarConsulta}>Agendar</button>
          </div>
        </div>
      )}
    </div>
  );
}