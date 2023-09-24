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
        stack JSON
    );
  `)
})

export function contagemPessoas() {
  return pool.query('SELECT count(id) FROM pessoas')
}

export async function inserirPessoa(id, apelido, nome, nascimento, stack) {
  const query = `
    INSERT INTO
      pessoas(id, apelido, nome, nascimento, stack)
      VALUES ($1, $2, $3, $4, $5::json)
  `
  return pool.query(query, [id, apelido, nome, nascimento, JSON.stringify(stack)]);
}