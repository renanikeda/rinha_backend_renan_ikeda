import { Router } from 'express'
import { contagemPessoas } from '../database/database'

const router = Router()

router.get('/', async (req, res) => {
  console.log('Teste GET /contagem-pessoas')
  const contagem = await contagemPessoas()
  console.log(`Contagem: ${JSON.stringify(contagem)}`)
  res.status(200).end()
})


module.exports = router