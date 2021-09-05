import axios from 'axios'
import { Network } from './types'

export const executeCommand = async (
  method: string,
  params: string[],
  network = 'testnet',
  wallet: string
): Promise<any> => {
  try {
    let user = process.env.TESTNET_RPC_USER
    let password = process.env.TESTNET_RPC_PASSWORD
    let host = process.env.TESTNET_RPC_HOST
    if (network === 'mainnet') {
      user = process.env.RPC_USER
      password = process.env.RPC_PASSWORD
      host = process.env.RPC_HOST
    }
    const url = `http://${user}:${password}@${host}${
      wallet ? 'wallet/' + wallet : ''
    }`
    const body: any = {
      jsonrpc: '1.0',
      id: new Date().getTime(),
      method
    }
    if (params && params.length > 0) body.params = params
    console.log('params', params)
    const response = await axios.post(url, body)
    return response.data
  } catch (err) {
    console.error('rpc error', err.response.data)
    if (err.response.status >= 400) return err.response.data
  }
}

export const getBlockCount = async (network: Network): Promise<any> => {
  try {
    let user = process.env.TESTNET_RPC_USER
    let password = process.env.TESTNET_RPC_PASSWORD
    let host = process.env.TESTNET_RPC_HOST
    if (network === 'mainnet') {
      user = process.env.RPC_USER
      password = process.env.RPC_PASSWORD
      host = process.env.RPC_HOST
    }
    const url = `http://${user}:${password}@${host}`
    const response = await axios.post(url, {
      jsonrpc: '1.0',
      id: new Date().getTime(),
      method: 'getblockcount',
      params: []
    })
    return response.data
    // return response
  } catch (err) {
    console.error('rpc error', err.response.data)
  }
}

export const getBalance = async (network: Network): Promise<any> => {
  try {
    let user = process.env.TESTNET_RPC_USER
    let password = process.env.TESTNET_RPC_PASSWORD
    let host = process.env.TESTNET_RPC_HOST
    if (network === 'mainnet') {
      user = process.env.RPC_USER
      password = process.env.RPC_PASSWORD
      host = process.env.RPC_HOST
    }
    const url = `http://${user}:${password}@${host}`
    const response = await axios.post(url, {
      jsonrpc: '1.0',
      id: new Date().getTime(),
      method: 'getbalance',
      params: []
    })
    return response.data
    // return response
  } catch (err) {
    console.error('rpc error', err.response.data)
  }
}
