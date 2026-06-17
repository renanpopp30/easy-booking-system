import api from "../../services/api"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function ListarUsuarios() {
    const navigate = useNavigate()
    const [allUsers, setAllUsers] = useState([])
    // useEffect é chamado toda vez que a tela carrega
    useEffect(() => {
        const token = localStorage.getItem('token')
        async function loadUsers() {
            const { data: { users } } = await api.get('/listar', {
                // Minha api recebe o token pelo req.headers.authorization
                headers: { Authorization: `Bearer ${token}` }
            })
            setAllUsers(users)
        }

        loadUsers()
    }, [])

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold m-1 text-center text-gray-800">Prestadores de Serviço</h2>
            <Link to="/perfil" className="text-blue-800 hover:underline mt-1 block text-center">Voltar</Link>
            <ul className="space-y-2">
                {/*allUsers && é como se fosse um if ex: if(allUsers){...}  */}
                {allUsers && allUsers.length > 0 && allUsers.map((user) => (
                    <li key={user.id} className="bg-gray-100 p-4 rounded-lg text-center">
                        <p className="font-bold">Nome: {user.name}</p>
                        <p className="font-bold">Profissão: {user.profession}</p>
                        <div className="relative mx-auto mt-0 mb-[1px] w-40 h-40">
                            <img src={user.linkURLimage} alt="Adicione sua foto" className="w-full h-full object-cover shadow-md border border-gray-300 rounded-full" />                            
                        </div>
                        <button className="w-32 bg-blue-500 mt-1 text-white py-2 px-4 rounded-md hover:bg-blue-400" >
                            <Link to={`/agendar/${user.slug}`}>Agendar</Link>
                        </button>
                    </li>
                ))}
            </ul>
            
        </div>

    )

}

export default ListarUsuarios