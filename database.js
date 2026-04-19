const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

let db

const criarBanco = async () => {

    // evita recriar conexão toda hora
    if (db) return db

    db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    })

    // TABELA LOCAIS
    
    await db.exec(`
        CREATE TABLE IF NOT EXISTS locais (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            endereco TEXT,
            tipo_ajuda TEXT,
            quantidade_necessaria INTEGER,
            quantidade_atual INTEGER DEFAULT 0,
            status TEXT DEFAULT 'ABERTO'
        )
    `)

  //NOVA TABELA VOLUNTÁRIOS
    
    await db.exec(`
        CREATE TABLE IF NOT EXISTS voluntarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            telefone TEXT,
            local_id INTEGER,
            FOREIGN KEY(local_id) REFERENCES locais(id)
        )
    `)

    console.log('Banco configurado com sucesso!')

    // INSERIR DADOS INICIAIS
    
    const checagem = await db.get(`SELECT COUNT(*) AS total FROM locais`)

    if (checagem.total === 0) {
        console.log('Inserindo dados iniciais...')

        await db.exec(`
            INSERT INTO locais (nome, endereco, tipo_ajuda, quantidade_necessaria) VALUES
            
            ('Abrigo Escola Central', 'Rua A', 'Cozinha', 3),
            ('Igreja Batista Suruí', 'Rua B', 'Limpeza', 5),
            ('Ginásio Municipal', 'Rua C', 'Organização', 4),
            ('Centro Comunitário', 'Rua D', 'Distribuição de alimentos', 6),
            ('Posto de Saúde', 'Rua E', 'Atendimento', 2)
        `)

        console.log('Dados inseridos com sucesso!')
    }

    return db
}

module.exports = { criarBanco }