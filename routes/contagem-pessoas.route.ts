import { Router } from 'express'

const router = Router()

router.get('/', async (req, res) => {
  console.log('Teste GET /contagem-pessoas')
  res.status(200).end()
})


module.exports = router