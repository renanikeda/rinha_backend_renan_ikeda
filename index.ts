import express = require('express')
import router from './router'

const app = express()

const { PORT = 8080, APP = 'RINHA-BACKEND-2023', NODE_ENV = 'development' } = process.env
export const env = NODE_ENV
console.log(`Env: ${env}`)

!(async function () {
  app.use(router)
  app.listen(PORT, () => console.log(`Environment : ${env} - Api ${APP} running on port ${PORT}!`))
})()