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
    let wallet =
      req.body.flags?.find((flag: any) => flag.includes('-rpcwallet')) || ''
    if (wallet) {
      wallet = wallet.replace('-rpcwallet=', '')
    }
    const response = await executeCommand(
      req.body?.method,
      req.body?.params,
      req.body?.network,
      wallet
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

app.listen(port, () => {
  return console.log(`server is listening on ${port}`)
})
