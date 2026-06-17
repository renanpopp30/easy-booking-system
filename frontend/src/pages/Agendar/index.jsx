import api from "../../services/api"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

function Agendar() {
    const [allAvailabilities, setAllAvailabilities] = useState([])
    const { slug } = useParams()
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('id')
    async function loadAvailabilities() {
        try {
            const { data: { services } } = await api.get(`/agendar/${slug}`, {
                // Minha api recebe o token pelo req.headers.authorization
                headers: { Authorization: `Bearer ${token}` }
            })
            setAllAvailabilities(services)
        } catch (erro) {
            console.log(err)
        }
        
    }
    // useEffect é chamado toda vez que a tela carrega
    // e puxa os dados do usuario
    useEffect(() => {
        if (!token) {
            try {
                alert("Você não está logado")
                navigate('/login')
            } catch (error) {
                alert("Erro ao acessar a página")
                console.log(error)
            }
        }else {
            loadAvailabilities()
        }
    }, [])

    async function salvarAgendamento(horario, availabilityId, dateTime) {
        const { data, error } = await api.post(`/salvar-agendamento/${id}`, // URL
            {
                availabilityId: availabilityId,
                date: dateTime,
                hour: horario
            }, // body backend recebe em req.body
            { headers: { Authorization: `Bearer ${token}` } } // config - recebe em req.headers no backend)
        )
        if (error) {
            return alert("Erro ao salvar disponibilidade ")
        }
        alert("Agendamento salvo com sucesso !!!")

        getUsers()
    }

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold m-6 text-center text-gray-800">Lista de Disponibilidade de Serviços</h2>
            <ul className="space-y-2">
                {allAvailabilities && allAvailabilities.length > 0 && allAvailabilities.map((availabilitie) => (
                    <li key={availabilitie.id} className="bg-gray-100 p-4 rounded-lg">
                        <p className="font-bold">Serviço: {availabilitie.serviceName}</p>
                        <p>Endereço: {availabilitie.serviceAddress}</p>
                        <p>Data: {new Date(availabilitie.dateTime).toLocaleDateString('pt-BR')}</p>
                        <p>Hora que abre: {availabilitie.horaInicio}</p>
                        <p>Hora que fecha: {availabilitie.horaFim}</p>
                        <p>Duração do atendimento: {availabilitie.interval}</p>
                        <p className="font-bold">Horários Disponiveis:</p>
                        <ul className="grid grid-cols-4 gap-2 text-gray-500">
                            {availabilitie.slots.map((slot, slotIndex) => (
                                <li key={slotIndex}>
                                    <button className="w-full bg-blue-500 mt-3 text-white py-2 px-4 rounded-md hover:bg-blue-400" onClick={() => salvarAgendamento(slot, availabilitie.id, availabilitie.dateTime)}>{slot}</button>
                                    {/* <a className="hover:text-gray-900 cursor-pointer"></a> */}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            <Link to="/listar-usuarios" className="text-blue-800 hover:underline mt-4 block text-center">Voltar</Link>
        </div>

    )

}

export default Agendar