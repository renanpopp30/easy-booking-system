import api from "../../services/api"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function PainelAgendamentosServicos() {
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('id')
    const [allAppointments, setAllAppointments] = useState()
    const [allAvailabilitys, setAllAvailabilitys] = useState()
    async function loadPanel() {
        try {
            const { data: { appointments, availabilitys } } = await api.get(`/painel-agendamentos-servicos/${id}`, {
                // Minha api recebe o token pelo req.headers.authorization
                headers: { Authorization: `Bearer ${token}` },
            })
            setAllAppointments(appointments)
            setAllAvailabilitys(availabilitys)
        } catch (err) {
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
        } else {
            loadPanel()
        }
    }, [])

    return (
        <div>
            <div className="max-w-lg mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold m-6 text-center text-gray-800">Agendamentos que fiz</h2>
                <Link to="/perfil" className="text-blue-800 hover:underline mt-4 block text-center">Voltar para meu Perfil</Link>
                <ul className="space-y-2">
                    {/* Appointment - agendamentos/compromissos que agendei */}
                    {allAppointments && allAppointments.length > 0 && allAppointments.map((appointment) => (
                        <li key={appointment.id} className="bg-gray-100 p-4 rounded-lg">
                            <p>Data: {appointment.date}</p>
                            <p>Horário {appointment.hour}</p>
                            <p>Status: {appointment.status}</p>
                        </li>
                    ))}
                </ul>

            </div>

            <div className="max-w-lg mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold m-6 text-center text-gray-800">Meus serviços/disponibilidades</h2>
                <Link to="/perfil" className="text-blue-800 hover:underline mt-4 block text-center">Voltar para meu Perfil</Link>
                <ul className="space-y-2">
                    {/* Appointment - agendamentos/compromissos que agendei */}
                    {allAvailabilitys && allAvailabilitys.length > 0 && allAvailabilitys.map((availabilitie) => (
                        <li key={availabilitie.id} className="bg-gray-100 p-4 rounded-lg">
                            <p className="font-semibold">Serviço: {availabilitie.serviceName}</p>
                            <p>Data: {availabilitie.dateTime}</p>
                            <p>Primeiro horário: {availabilitie.horaInicio}</p>
                            <p>Horário que fecha: {availabilitie.horaFim}</p>
                            <p>Horário que fecha: {availabilitie.horaFim}</p>
                            <p>Duração do atendiemnto: {availabilitie.interval}</p>
                        </li>
                    ))}
                </ul>
            </div>

        </div>

    )

}

export default PainelAgendamentosServicos