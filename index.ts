import express = require('express')
import router from './router'

const app = express()

const { PORT = 3001, APP = 'quasar-initial', NODE_ENV = 'development', WEB_PORT = 8081 } = process.env
export const env = NODE_ENV
console.log(`Env: ${env}`)

!(async function () {
  app.use(router)
  app.listen(PORT, () => console.log(`Environment : ${env} - Api ${APP} running on port ${PORT}!`))
})()