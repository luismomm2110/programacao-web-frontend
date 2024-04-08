import React from 'react';

import './consultas.css';

export const Consulta = () => {
  const doctors = [
    { id: 1, name: 'Dr. Ana Silva' },
    { id: 2, name: 'Dr. João Souza' },
    { id: 3, name: 'Dr. Maria Pereira' },
  ];

  return (
    <div className={'consultas'}>
      <h1>Médicos</h1>
        {doctors.length === 0 ? <p>Não há médicos disponíveis</p> :
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            {doctor.name}
            <button onClick={() => alert(`Booking appointment with ${doctor.name}`)}>Marcar Consulta</button>
          </li>
        ))}
      </ul>
        }
    </div>
  );
}
