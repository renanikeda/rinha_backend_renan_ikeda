import express = require('express')
import router from './router'

const app = express()

const { PORT = 8080, APP = 'RINHA-BACKEND-2023', NODE_ENV = 'development', DB_URL = "postgres://user:pass@postgres:5555/postgres" } = process.env

export const env = NODE_ENV
export const db_url = DB_URL

console.log(`Env: ${env}`)
console.log(`DB URL: ${db_url}`)

!(async function () {
  app.use(router)
  app.listen(PORT, () => console.log(`Environment : ${env} - Api ${APP} running on port ${PORT}!`))
})()