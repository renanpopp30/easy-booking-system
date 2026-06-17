import api from "../../services/api"
import { useEffect, useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"

function CreateAvailability() {
    const [allUser, setAllUser] = useState(null)
    const imageRef = useRef()
    const [urlImageUser, setUrlImageUser] = useState()
    const [nameUser, setNameUser] = useState()
    const [emailUser, setEmailUser] = useState()
    const [dateTime, setDateTime] = useState("")
    const [horaInicio, setHoraInicio] = useState("")
    const [horaFim, setHoraFim] = useState("")
    const [intervalo, setIntervalo] = useState("")
    const [serviceName, setServiceName] = useState("")
    const [serviceAddress, setServiceAddress] =useState("")
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('id')
    
    async function loadUser() {
        try {
            const { data: { user } } = await api.get(`/perfil/${id}`, {
                // Minha api recebe o token pelo req.headers.authorization
                headers: { Authorization: `Bearer ${token}` },
            })
            setAllUser(user)
            setUrlImageUser(user.linkURLimage)
            setEmailUser(user.email)
            setNameUser(user.name)
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
        }else {
            loadUser()
        }
    }, []) // ver de por token, navigate, loadUser por causa disso:
    // Tenho que deixar o token detro desse array pq
    // Sempre que o valor da variável token mudar, o React roda o bloco de código novamente
    // deixar o navigatee loadUser porque a documentação do React fala para deixar ali nas 
    // dependências toda variavel ou função externa
    async function salvarDisponibilidade() {
        if (!dateTime || !horaInicio || !horaFim || !intervalo) {
            return alert("Preecha todos os campos !!!")
        }
        const { data, error } = await api.post(`/create-availability/${id}`, // URL
            {
                dateTime: dateTime,
                horaInicio: horaInicio,
                horaFim: horaFim,
                interval: intervalo,
                serviceName: serviceName,
                serviceAddress: serviceAddress
            }, // body backend recebe em req.body
            { headers: { Authorization: `Bearer ${token}` } } // config - recebe em req.headers no backend)
        )
        if (error) {
            return alert("Erro ao salvar disponibilidade ")
        }
        alert("Disponibilidade salva com sucesso !!!")
        setDateTime("")
        setHoraInicio("")
        setHoraFim("")
        setIntervalo("")
        setServiceName("")
        setServiceAddress("")
    }
    function logout() {
        try {
            localStorage.setItem('token', "")
            localStorage.setItem('id', "")
        } catch (error) {
            alert("Erro ao sair. Tente Novamente")
        }
        
    }
    async function deleteUser() {
        let deletar = confirm("Tem certeza que deseja deletar sua conta")
        if (deletar == true) {
            try {
                const { data, error } = await api.delete(`/delete-user/${id}`, // URL
                    { headers: { Authorization: `Bearer ${token}` } } // config - recebe em req.headers no backend)
                )
                alert("Usuário deletado com sucesso")
            } catch (err) {
                console.log(err)
                alert(err)
            }
        }
    }
    
    return (
        <div className="max-w-lg mx-auto mt-12 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold m-1 text-center text-gray-800">Crie sua disponibilidade de serviço</h2>
            <ul className="space-y-2 mb-1">
                {allUser && (
                    <li className="bg-gray-100 p-4 rounded-lg">
                        {console.log()}
                        <p>Nome da conta: {allUser.name}</p>
                        <p>E-mail: {allUser.email}</p>
                        {/* <p>Data Cadastro: {new Date(allUser.createdAt).toLocaleDateString('pt-BR')}</p>
                        <p>Último login: {new Date(allUser.lastLogin).toLocaleString('pt-BR', { timeStyle: 'short', dateStyle: 'short' })}</p> */}
                    </li>
                )}
            </ul>
            <input value={serviceName} onChange={(e) => setServiceName(e.target.value)} type="text" placeholder="Nome do Serviço. Ex: Corte de cabelo" className="w-full mb-1 px-3 py-2 border border-gray-300 rounded-md" />
            <input value={serviceAddress} onChange={(e) => setServiceAddress(e.target.value)} type="text" placeholder="Local do estabelecimento" className="w-full mb-1 px-3 py-2 border border-gray-300 rounded-md" />
            <input value={dateTime} onChange={(e) => setDateTime(e.target.value)} type="date" placeholder="Dia / Data" className="w-full mb-1 px-3 py-2 border border-gray-300 rounded-md" />
            <input value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} type="time" placeholder="Seu horário de ínicio" className="w-full mb-1 px-3 py-2 border border-gray-300 rounded-md" />
            <input value={horaFim} onChange={(e) => setHoraFim(e.target.value)} type="time" placeholder="Seu horário de fechamento" className="w-full mb-1 px-3 py-2 border border-gray-300 rounded-md" />
            <input value={intervalo} onChange={(e) => setIntervalo(e.target.value)} type="number" placeholder="Tempo de atendimento. Ex: 30 (30 minutos)" className="w-full mb-1 px-3 py-2 border border-gray-300 rounded-md" />
            <button className="w-full bg-blue-500 mt-3 text-white py-2 px-4 rounded-md hover:bg-blue-400" onClick={salvarDisponibilidade}>Salvar Disponibilidade</button>
            <Link to="/perfil" className="text-blue-800 hover:underline mt-3 block text-center">Voltar</Link>
        </div>
    )

}

export default CreateAvailability