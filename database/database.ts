const pg = require('pg')
const DB_URL = process.env.DB_URL || 'postgres://admin:admin@postgres:5555/postgres'

const pool = new pg.Pool({
  connectionString: DB_URL
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
