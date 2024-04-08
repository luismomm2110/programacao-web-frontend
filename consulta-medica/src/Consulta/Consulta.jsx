import React, {useState} from 'react';

import './consultas.css';
import DatePicker from 'react-datepicker'

export const Consulta = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const doctors = [
    { id: 1, name: 'Dr. Ana Silva' },
    { id: 2, name: 'Dr. João Souza' },
    { id: 3, name: 'Dr. Maria Pereira' },
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={'consultas'}>
      <h1>Médicos</h1>
        {doctors.length === 0 ? <p>Não há médicos disponíveis</p> :
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            {doctor.name}
            <button onClick={openModal}>Marcar Consulta</button>
          </li>
        ))}
      </ul>
        }
          {isModalOpen && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', zIndex: 1000 }}>
          <h2>Choose a Date</h2>
          <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </div>
  );
}
