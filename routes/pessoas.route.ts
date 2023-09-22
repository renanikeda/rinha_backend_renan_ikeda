import { Router } from 'express'

const router = Router()

router.post('/', async (req, res) => {
  console.log('Teste POST /pessoas')
  res.status(200).end()
})

router.get('/:id', async (req, res) => {
  console.log('Teste GET /pessoas/:id')
  res.status(200).end()
})

router.get('/', async (req, res) => {
  console.log('Teste GET /pessoas/t=?')
  res.status(200).end()
})

module.exports = router
