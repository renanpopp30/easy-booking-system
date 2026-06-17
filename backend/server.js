import express from 'express';
import publicRoutes from './routes/public.js'
import privateRouter from './routes/private.js'
import auth from './middlewares/auth.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/', publicRoutes)
app.use('/', auth, privateRouter)

app.listen(3000, () => console.log("Servidor Rodando"))

// renanpopp45_db_user
// pEqZS0h7WB96WsM7
// mongodb+srv://renanpopp45_db_user:pEqZS0h7WB96WsM7@agendamentosaas.rohvrgc.mongodb.net/?appName=AgendamentoSaaS