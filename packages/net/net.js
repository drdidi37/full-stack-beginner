const express = require('express')

const app = express()

app.get('/api/proxy', (req, res) => {
  const { method, url } = req
  console.log(method, url)
  // 一般
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000')
  res.send(`response: ${method} ${url}`)
  res.end()
})

app.options('/api/proxy', (req, res) => {
  const { method, url } = req
  console.log(method, url)
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000')
  // 当写入tocken时，需要设置Access-Control-Allow-Headers
  res.setHeader('Access-Control-Allow-Headers', 'Token,Content-Type')
  // 若想写入cookie，需要将Access-Control-Allow-Credentials设置为true
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.send(`response: ${method} ${url}`)
  res.end()
})

app.listen(3000, () => {
  console.log('listen port 3000')
})
