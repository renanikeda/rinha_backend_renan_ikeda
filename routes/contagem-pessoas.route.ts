import { Router } from 'express'
import { contagemPessoas } from '../database/database'

const router = Router()

router.get('/', async (req, res) => {
  console.log('Route GET /contagem-pessoas')
  const { rows } = await contagemPessoas()
  const contagem = rows[0]
  console.log(`Contagem: ${contagem?.count}`)
  res.status(200).json(contagem)
})


module.exports = router