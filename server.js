const express = require('express')
const { criarBanco } = require('./database')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

// ROTA INICIAL

app.get('/', (req, res) => {
    res.send(`
        <body>
        <h1>SOS Conecta</h1>
        <h2>Organização de Voluntários</h2>
        <p>Endpoint: /locais</p>
        </body>
    `)
})

// LISTAR LOCAIS

app.get('/locais', async (req, res) => {
    const db = await criarBanco()

    const locais = await db.all(`SELECT * FROM locais`)
    res.json(locais)
})


// BUSCAR LOCAL

app.get('/locais/:id', async (req, res) => {
    const db = await criarBanco()
    const { id } = req.params

    const local = await db.get(
        `SELECT * FROM locais WHERE id = ?`,
        [id]
    )

    res.json(local)
})

// CRIAR LOCAL

app.post('/locais', async (req, res) => {
    const db = await criarBanco()
    const { nome, endereco, tipo_ajuda, quantidade_necessaria } = req.body

    await db.run(`
        INSERT INTO locais (nome, endereco, tipo_ajuda, quantidade_necessaria)
        VALUES (?, ?, ?, ?)
    `, [nome, endereco, tipo_ajuda, quantidade_necessaria])

    res.send(`Local ${nome} criado com sucesso!`)
})

// VOLUNTARIAR

app.post('/voluntariar', async (req, res) => {
    const db = await criarBanco()
    const { nome, telefone, local_id } = req.body

    if (!nome || !telefone || !local_id) {
        return res.status(400).send('Preencha todos os campos')
    }

    const local = await db.get(
        `SELECT * FROM locais WHERE id = ?`,
        [local_id]
    )

    if (!local) {
        return res.status(404).send('Local não encontrado')
    }

    if (local.quantidade_atual >= local.quantidade_necessaria) {
        return res.send('Esse local já está completo!')
    }

    await db.run(`
        INSERT INTO voluntarios (nome, telefone, local_id)
        VALUES (?, ?, ?)
    `, [nome, telefone, local_id])

    await db.run(`
        UPDATE locais
        SET quantidade_atual = quantidade_atual + 1
        WHERE id = ?
    `, [local_id])

    res.send('Voluntário cadastrado com sucesso!')
})


// LISTAR VOLUNTÁRIOS

app.get('/voluntarios', async (req, res) => {
    const db = await criarBanco()

    const voluntarios = await db.all(`
        SELECT 
            v.id,
            v.nome,
            v.telefone,
            l.nome AS local_nome
        FROM voluntarios v
        JOIN locais l ON v.local_id = l.id
    `)

    res.json(voluntarios)
})


// ATUALIZAR

app.put('/locais/:id', async (req, res) => {
    const db = await criarBanco()
    const { id } = req.params
    const { tipo_ajuda, quantidade_necessaria } = req.body

    await db.run(`
        UPDATE locais
        SET tipo_ajuda = ?, quantidade_necessaria = ?
        WHERE id = ?
    `, [tipo_ajuda, quantidade_necessaria, id])

    res.send(`Local ${id} atualizado`)
})


// DELETAR

app.delete('/locais/:id', async (req, res) => {
    const db = await criarBanco()
    const { id } = req.params

    await db.run(`DELETE FROM locais WHERE id = ?`, [id])

    res.send(`Local ${id} removido`)
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})