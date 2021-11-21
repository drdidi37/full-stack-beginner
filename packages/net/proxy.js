const express = require('express')

const app = express()
const port = 4000

app.use('/static', express.static('public'))
app.listen(port, () => {
  console.log('listen on port', port)
})
