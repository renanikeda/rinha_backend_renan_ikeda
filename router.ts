import { Router } from 'express'

const router = Router()

const file = `${__dirname}/routes/rinha.route.js`
console.log(`Iniciando rotas ${file}`)
router.use('/', require(file))
export default router