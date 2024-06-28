import {useNavigate} from "react-router-dom";
import {useAuth} from "../AuthContext";
import {useEffect, useState} from "react";
import './home.css'

export const  Home = () => {
    const  {user, _} = useAuth()
    const navigate = useNavigate()
    const [consultas, setConsultas] = useState([])

    //buscar consulta
    useEffect(() => {
        fetch(`http://localhost:5000/pacientes/${user.id}/consultas`, {
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }}).then(response => response.json())
            .then(data => setConsultas(data))
    }, []);

    const handleConsulta = () => {
        navigate('/consulta')
    }

    const handleCancelar = (consulta) => {
        fetch(`http://localhost:5000/consultas/${consulta.consulta_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }
        })
        //atualizar a lista de consultas
        .then(() => {
            setConsultas(consultas.filter(c => c.consulta_id !== consulta.consulta_id))
        })
    }

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
        <div className={'home'}>
            <header>
                <h1>Home</h1>
                <button onClick={handleConsulta}>Nova Consulta</button>
            </header>
            <section>
                <h2>Consultas marcadas</h2>
                <Consultas />
            </section>
        </div>
    )
}