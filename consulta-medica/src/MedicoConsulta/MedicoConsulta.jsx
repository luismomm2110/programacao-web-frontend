import React, {useEffect, useState} from 'react';

import './medicalconsultas.css';
import {useNavigate, useParams} from "react-router-dom";

export const MedicoConsulta = () => {
    const { id } = useParams();
    const [nome, setNome] = useState('');
    const [carregando, setCarregando] = useState(true);
    const [consultas, setConsultas] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/medicos/${id}/consultas`)
            .then((response) => response.json())
            .then((data) => setConsultas(data))
            .catch((error) => {
                console.error('Error:', error);
            });
        }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/medicos/${id}/consultas`)
            .then((response) => response.json())
            .then((data) => setNome(data.nome))
            .then(() => setCarregando(false))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const handleCancelar = (consulta) => {}

    const Consultas = () => {
        if (consultas.length === 0) return (<p>Nenhuma consulta marcada</p>)
        const formatDate = (date) => {
            const [year, month, day] = date.split('-');
            return `${day}/${month}/${year}`;
        }


        return (
            <ul>
                {consultas.map(consulta =>
                    <li key={consulta.id} className={'consulta-card'}>
                        <p>{consulta.medico.nome}</p>
                        <p>{formatDate(consulta.horario)}</p>
                        <button onClick={() => handleCancelar(consulta)}>
                            Cancelar
                        </button>
                    </li>)
                }
            </ul>
        )
    }

  return (
    <div>
        {carregando ? <p>Carregando...</p> : <h1>Consultas do médico {nome}</h1>}
        <Consultas/>
    </div>
  );
}