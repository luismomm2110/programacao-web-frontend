import React, {useState} from 'react';

import './consultas.css';

const getTodayFormattedForInput = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, '0');
    const day = `${today.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;  // YYYY-MM-DD
  };

export const Consulta = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getTodayFormattedForInput());

  const doctors = [
    { id: 1, name: 'Dr. Ana Silva' },
    { id: 2, name: 'Dr. João Souza' },
    { id: 3, name: 'Dr. Maria Pereira' },
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const onMarcarConsulta = () => {
    alert(`Consulta marcada para ${selectedDate}`);
    closeModal();
  }

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