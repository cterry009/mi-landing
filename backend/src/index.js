const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3001

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

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`)
})
