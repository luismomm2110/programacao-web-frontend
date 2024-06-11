import React, {useEffect, useState} from 'react';

import './medicalconsultas.css';
import {useNavigate, useParams} from "react-router-dom";

const getTodayFormattedForInput = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, '0');
    const day = `${today.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;  // YYYY-MM-DD
  };


export const MedicoConsulta = () => {
    const { id } = useParams();

    useEffect(() => {
        function setDoctors(data) {
            return undefined;
        }

        fetch(`http://localhost:8080/medicos/${id}/consultas`)
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => {
                console.error('Error:', error);
            });
        }, []);


  return (
    <div className={'medicalConsultas'}>
        <header>
          <h1>Veja suas consultas</h1>
        </header>
    </div>
  );
}