import { Router } from 'express'
import { inserirPessoa } from '../database/database'
const { v4: uuidv4 } = require('uuid')

const router = Router()

router.post('/', async (req, res) => {
  console.log('Route POST /pessoas')
  const { apelido, nome, nascimento, stack } = req.body
  const id = uuidv4()
  inserirPessoa(id, apelido, nome, nascimento, stack).then(() => {
    res.status(201).location(`/pessoas/${id}`).end()
  }).catch(() => {
    res.status(422).end()
  })
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
