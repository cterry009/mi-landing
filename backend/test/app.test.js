// Pruebas de la API con el runner nativo de Node (node --test), sin dependencias extra.
const { test, before, after } = require('node:test')
const assert = require('node:assert/strict')
const app = require('../src/app')

let server
let base

before(async () => {
  server = app.listen(0)
  await new Promise((resolve) => server.once('listening', resolve))
  base = `http://127.0.0.1:${server.address().port}`
})

after(() => server.close())

const post = (body) =>
  fetch(`${base}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

test('GET /api/health responde ok', async () => {
  const res = await fetch(`${base}/api/health`)
  assert.equal(res.status, 200)
  assert.deepEqual(await res.json(), { status: 'ok' })
})

test('POST /api/contact acepta un email válido', async () => {
  const res = await post({ email: 'persona@ejemplo.com' })
  assert.equal(res.status, 201)
  assert.deepEqual(await res.json(), { received: true })
})

test('POST /api/contact rechaza un email sin @', async () => {
  const res = await post({ email: 'no-es-un-email' })
  assert.equal(res.status, 400)
})

test('POST /api/contact rechaza el cuerpo vacío', async () => {
  const res = await post({})
  assert.equal(res.status, 400)
})
