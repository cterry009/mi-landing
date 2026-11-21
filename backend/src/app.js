const express = require('express')
const cors = require('cors')

// La app se arma aquí y se arranca en index.js, para poder probarla sin abrir un puerto fijo.
const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.post('/api/contact', (req, res) => {
  const { email } = req.body || {}
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Email inválido' })
  }
  console.log('Nuevo lead:', email)
  res.status(201).json({ received: true })
})

module.exports = app
