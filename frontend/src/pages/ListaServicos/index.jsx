import api from "../../services/api"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function ListarServicos() {
    const [allServices, setAllServices] = useState([])
    // useEffect é chamado toda vez que a tela carrega
    useEffect(() => {
        const token = localStorage.getItem('token')
        async function loadServices() {
            const { data: {services} } = await api.get('/listar-servicos', {
                // Minha api recebe o token pelo req.headers.authorization
                headers: { Authorization: `Bearer ${token}` }
            })
            setAllServices(services)
        }
        
        loadServices()
    }, [])

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold m-6 text-center text-gray-800">Lista de Disponibilidade de Serviços</h2>
            <ul className="space-y-2">
                {allServices && allServices.length > 0 && allServices.map((service) => (
                    <li key={service.id} className="bg-gray-100 p-4 rounded-lg">
                        <p className="font-bold">Id Serviço: {service.id}</p>
                        <p>Data: {service.dateTime}</p>
                        <p>Hora que abre: {service.horaInicio}</p>
                        <p>Hora que fecha: {service.horaFim}</p>
                        <p>Duração do atendimento: {service.interval}</p>
                    </li>
                ))}
            </ul>
            <Link to="/perfil" className="text-blue-800 hover:underline mt-4 block text-center">Voltar</Link>
        </div>

    )

}

export default ListarServicos