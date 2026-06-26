import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Cadastro from "./pages/Cadastro"
import Login from "./pages/Login"
import ListarUsuarios from "./pages/Lista"
import Perfil from "./pages/Perfil"
import TrocarSenhaUser from "./pages/TrocarSenhaUser"
import CreateAvailability from "./pages/CreateAvailability"
import ListarServicos from "./pages/ListaServicos"
import Agendar from "./pages/Agendar"
import PainelAgendamentosServicos from "./pages/PainelAgendamentosServicos"
function App() {
  return (
    <BrowserRouter>
    <header className="bg-blue-600 text-white p-4 shadow-lg">
      <h1 className="text-2xl font-extrabold text-center">Easy Booking System</h1>
    </header>
      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ListarUsuarios />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/trocar-senha" element={<TrocarSenhaUser />} />
        <Route path="/create-availability" element={<CreateAvailability />} />
        <Route path="/listar-servicos" element={<ListarServicos />} />
        <Route path="/agendar/:slug" element={<Agendar />} />
        <Route path="/painel-agendamentos-servicos" element={<PainelAgendamentosServicos />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App