const pg = require('pg')

const { DB_URL = 'postgres://admin:admin@postgres:5432/postgres', DB_POOL = 10, REQ_TIMEOUT = 2000 } = process.env

const pool = new pg.Pool({
  connectionString: DB_URL,
  max: DB_POOL,
  connectionTimeoutMillis: REQ_TIMEOUT
});

pool.on('connect', () => {
  console.log('Criando Base de Dados!')
  return pool.query(`
    CREATE TABLE IF NOT EXISTS pessoas (
        id uuid DEFAULT gen_random_uuid() UNIQUE NOT NULL,
        apelido TEXT UNIQUE NOT NULL,
        nome TEXT NOT NULL,
        nascimento DATE NOT NULL,
        stack JSON,
        termo TEXT
    );
  `)
})

export function contagemPessoas() {
  return pool.query('SELECT count(id) FROM pessoas')
}

export async function inserirPessoa(id: string, apelido: string, nome: string, nascimento: string, stack: string[]) {
  const termo = `${apelido}|${nome}|${stack.join('|')}`
  const query = `
    INSERT INTO
      pessoas(id, apelido, nome, nascimento, stack, termo)
      VALUES ($1, $2, $3, $4, $5::json, $6)
  `
  return pool.query(query, [id, apelido, nome, nascimento, JSON.stringify(stack), termo]);
}

export async function getPessoa(id: string) {
  const query = `SELECT id, apelido, nome, nascimento, stack, termo FROM pessoas WHERE id = $1`
  return pool.query(query, [id])
}

export async function procuraTermo (termo: string) {
  const query = `SELECT id, apelido, nome, nascimento, stack FROM pessoas WHERE termo LIKE $1 LIMIT 50`
  return pool.query(query, [`%${termo}%`])
}