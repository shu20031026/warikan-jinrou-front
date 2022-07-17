import type { IncomingMessage, ServerResponse } from 'http'
import httpProxy from 'http-proxy'

const target = 'https://warikan-jinrou.herokuapp.com/'
const proxy = httpProxy.createProxyServer({ target, changeOrigin: true })

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  req.url = req.url?.replace(new RegExp('^/api'), '')

  return new Promise((resolve, reject) => {
    try {
      proxy.web(req, res, { proxyTimeout: 5000 }, (e) => {
        reject(e)
      })
      resolve
    } catch (e) {
      reject(e)
    }
  })
}
