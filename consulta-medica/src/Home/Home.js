import {useNavigate} from "react-router-dom";
import {useAuth} from "../AuthContext";
import {useEffect, useState} from "react";

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

    // botao para ir pra pagina de consulta
    const handleConsulta = () => {
        navigate('/consulta')
    }

    return (
        // TODO arrumar estilo
        <div className={'home'}>
            <h1>Home</h1>
            <button onClick={handleConsulta}>Nova Consulta</button>
        </div>
    )

}