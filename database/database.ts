const pg = require('pg')
const DB_URL = process.env.DB_URL || 'postgres://admin:admin@postgres:5555/postgres'

const pool = new pg.Pool({
  connectionString: DB_URL
});


pool.on('connect', () => {
  console.log('Criando Base de Dados!');
  return pool.query(`
    CREATE TABLE IF NOT EXISTS pessoas (
        id uuid TEXT UNIQUE NOT NULL,
        apelido TEXT UNIQUE NOT NULL,
        nome TEXT NOT NULL,
        nascimento DATE NOT NULL,
        stack JSON
    );

    CREATE INDEX IF NOT EXISTS idx_pessoas_searchable ON public.pessoas USING gist (searchable public.gist_trgm_ops (siglen='64'));

    CREATE UNIQUE INDEX IF NOT EXISTS pessoas_apelido_index ON public.pessoas USING btree (apelido);
    `)
})

export function contagemPessoas() {
  return pool.query('SELECT count(id) FROM pessoas')
}
