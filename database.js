    const sqlite3 = require('sqlite3')
    const { open } = require('sqlite')

    const criarBanco = async () => {

        const db = await open({
            filename: './database.db',
            driver: sqlite3.Database
        })

        //  CRIAR TABELA
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

        console.log('Banco configurado: tabela LOCAIS pronta!')


        // VERIFICA se ja tem dados
        const checagem = await db.get(`SELECT COUNT(*) AS total FROM locais`)

        if (checagem.total === 0) {
            console.log('Inserindo dados iniciais')

            await db.exec(`
                INSERT INTO locais (nome, endereco, tipo_ajuda, quantidade_necessaria) VALUES
                
                ('Abrigo Escola Central', 'Rua A', 'Cozinha', 3),
                ('Igreja Batista Suruí', 'Rua B', 'Limpeza', 5),
                ('Ginásio Municipal', 'Rua C', 'Organização', 4),
                ('Centro Comunitário', 'Rua D', 'Distribuição de alimentos', 6),
                ('Posto de Saúde', 'Rua E', 'Atendimento', 2)
            `)

            console.log('Dados inseridos com sucesso!')
        } else {
            console.log(`Banco já possui ${checagem.total} registros`)
        }


        //  ver tudo
        console.log('----- LOCAIS -----')
        const locais = await db.all(`SELECT * FROM locais`)
        console.log(locais)


        //  FILTRO (exemplo)
        console.log('----- LOCAIS QUE PRECISAM DE COZINHA -----')
        const cozinha = await db.all(`
            SELECT * FROM locais WHERE tipo_ajuda = 'Cozinha'
        `)
        console.log(cozinha)


        //  UPDATE (simular alguém ajudando)
       // await db.run(`
        //    UPDATE locais
       //     SET quantidade_atual = quantidade_atual + 1
       //     WHERE id = 1
       // `)

       // console.log('Voluntário adicionado ao local ID 1')

        //  DELETE (exemplo)
       // await db.run(`
       //     DELETE FROM locais WHERE status = 'COMPLETO'
       // `)

       // console.log('Locais completos removidos (exemplo)')


        //  RESULTADO FINAL
        console.log('----- RELATÓRIO FINAL -----')
        const resultadoFinal = await db.all(`SELECT * FROM locais`)
        console.log(resultadoFinal)

        return db
    }

    module.exports = { criarBanco } 