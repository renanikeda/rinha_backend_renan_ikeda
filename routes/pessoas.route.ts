import { Router } from 'express'
import { getPessoa, inserirPessoa, procuraTermo } from '../database/database'
const { v4: uuidv4 } = require('uuid')
const { parse } = require('date-fns');
const router = Router()


const validaBody = (req, res, next) => {
  const validaData = (dateString) => {
    return !isNaN(parse(dateString, 'yyyy-MM-dd', new Date()))
  }

  function valida(req) {
    const { apelido, nome, nascimento, stack } = req.body
    console.log({ apelido, nome, nascimento, stack })
    if(typeof apelido !== 'string' || apelido.length > 32)
      return false

    if(typeof nome !== 'string' || nome.length > 100)
      return false

    if(typeof nascimento !== 'string' || !validaData(nascimento))
      return false

    if(stack !== undefined && !Array.isArray(stack))
      req.body.stack = []

    if(stack && stack.length)
      req.body.stack = stack.filter((s) => typeof s === 'string' || s !== "" || s.length < 32)

    return true
  }

  if (!valida(req))
      return res.status(422).end()
  next()
}

router.post('/', validaBody, async (req, res) => {
  console.log('Route POST /pessoas')
  const { apelido, nome, nascimento, stack } = req.body
  const id = uuidv4()
  try {
    const { rows: result } = await inserirPessoa(id, apelido, nome, nascimento, stack)
    // console.log(`Result: ${JSON.stringify(result)}`)
    res.status(201).location(`/pessoas/${id}`).end()
  } catch {
    res.status(422).end()
  }
})

router.get('/:id', async (req, res) => {
  console.log('Route GET /pessoas/:id')
  const { id } = req.params
  try {
    const { rows: [pessoa] } = await getPessoa(id)
    // console.log(`Pessoa: ${JSON.stringify(pessoa)}`)
    if (pessoa === undefined) {
      res.status(404).end()
    } else {
      res.status(200).json(pessoa).end()
    }
  } catch {
    res.status(404).end()
  }
})

router.get('/', async (req, res) => {
  console.log('Route GET /pessoas?t=[:termo]')
  const termo = req.query.t
  try {
    const { rows: result } = await procuraTermo(termo)
    // console.log(`Termo: ${JSON.stringify(result)}`)
    res.status(200).json(result)
  } catch {
    res.status(404).end()
  }
})

module.exports = router
