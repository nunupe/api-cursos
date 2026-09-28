import express from 'express'
import instrutorRouter from './routes/instrutorRouter'

const app = express()

app.use(express.json())
app.use("/api/instrutores", instrutorRouter)
app.use("/api/cursos", require("./routes/cursoRouter").default)

app.listen(3000, () => {
    console.log("Seridor rodando na porta 3000")
})