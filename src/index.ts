import express from 'express'
require('dotenv').config()
import { executeCommand, getBlockCount, getBalance } from './json-rpc'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Welcome to the Bitcoin Core API')
})

app.post('/rpc', async (req, res, next) => {
  try {
    const response = await executeCommand(
      req.body?.method,
      req.body?.params,
      req.body?.network
    )
    if (response.status >= 400) {
      console.log('bad stuff')
      next(response.statusText)
    }
    res.send(response)
  } catch (err) {
    next(err)
  }
})

app.listen(port, (err) => {
  if (err) {
    return console.error(err)
  }
  return console.log(`server is listening on ${port}`)
})
