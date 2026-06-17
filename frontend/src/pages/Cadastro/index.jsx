import { Link, useNavigate } from "react-router-dom"
import { useRef } from "react"
import api from "../../services/api"
function Cadastro() {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordlRef = useRef()
    const slugRef = useRef()
    const professionRef = useRef()
    const navigate = useNavigate()

    async function handleSubmit(event) {
        // preventDefault() -> faz não reinicia a tela
        event.preventDefault()
        try {
            await api.post('/cadastro', {
                name: nameRef.current.value,
                email: emailRef.current.value,
                profession: professionRef.current.value,
                password: passwordlRef.current.value,
                slug: slugRef.current.value                
            })
            alert('Usuário cadastrado com sucesso !!')
            navigate('/login')
        } catch (err) {
            alert('Erro ao cadastrar usuário')
        }
        // Valor do input vem dentro desse "caminho" do objeto
        //console.log(nameRef.current.value)
    }

    return (
        <div className="max-w-lg mx-auto mt-9 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold m-6 text-center text-gray-800">Cadastro</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input ref={nameRef} type="text" placeholder="Nome" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                <input ref={professionRef} type="text" placeholder="Profissão / Ocupação" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                <input ref={emailRef} type="email" placeholder="Email" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                <input ref={passwordlRef} type="password" placeholder="Senha" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                <input ref={slugRef} type="text" placeholder="Crie a URL do seu perfil. Ex: renan-popp-30" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400">Cadastrar-se</button>
            </form>
            <Link to="/login" className="text-blue-800 hover:underline mt-4 block text-center">Já tem uma conta? Faça login</Link>
        </div>
    )

}

export default Cadastro