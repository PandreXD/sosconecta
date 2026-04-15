const express = require('express')
const { criarBanco } = require('./database')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

//  Rota inicial
app.get('/', (req, res) => {
    res.send(`
        <body>
        <h1>SOS Conecta</h1>
        <h2>Organização de Voluntários</h2>
        <p>Endpoint: /locais</p>
        </body>
    `)
})


//  LISTAR TODOS OS LOCAIS
app.get('/locais', async (req, res) => {
    const db = await criarBanco()
    const locais = await db.all(`SELECT * FROM locais`)
    res.json(locais)
})


//  BUSCAR UM LOCAL POR ID
app.get('/locais/:id', async (req, res) => {
    const { id } = req.params
    const db = await criarBanco()

    const local = await db.get(
        `SELECT * FROM locais WHERE id = ?`,
        [id]
    )

    res.json(local)
})


//  CRIAR NOVO LOCAL
app.post('/locais', async (req, res) => {
    const { nome, endereco, tipo_ajuda, quantidade_necessaria } = req.body

    const db = await criarBanco()

    await db.run(`
        INSERT INTO locais (nome, endereco, tipo_ajuda, quantidade_necessaria)
        VALUES (?, ?, ?, ?)
    `, [nome, endereco, tipo_ajuda, quantidade_necessaria])

    res.send(`Local ${nome} criado com sucesso!`)
})


//  VOLUNTARIAR (AÇÃO PRINCIPAL 🔥)
app.post('/ajudar/:id', async (req, res) => {
    const { id } = req.params
    const db = await criarBanco()

    await db.run(`
        UPDATE locais
        SET quantidade_atual = quantidade_atual + 1
        WHERE id = ?
    `, [id])

    res.send(`Você se voluntariou com sucesso!`)
})


//  ATUALIZAR LOCAL
app.put('/locais/:id', async (req, res) => {
    const { id } = req.params
    const { tipo_ajuda, quantidade_necessaria } = req.body

    const db = await criarBanco()

    await db.run(`
        UPDATE locais
        SET tipo_ajuda = ?, quantidade_necessaria = ?
        WHERE id = ?
    `, [tipo_ajuda, quantidade_necessaria, id])

    res.send(`Local ${id} atualizado com sucesso!`)
})


//  DELETAR LOCAL
app.delete('/locais/:id', async (req, res) => {
    const { id } = req.params
    const db = await criarBanco()

    await db.run(`DELETE FROM locais WHERE id = ?`, [id])

    res.send(`Local ${id} removido com sucesso!`)
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})