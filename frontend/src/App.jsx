import { useState } from 'react'

const features = [
  { icon: '⚡', title: 'Rápido', desc: 'Carga en menos de 1s' },
  { icon: '🎨', title: 'Consistente', desc: 'Un solo sistema de diseño' },
  { icon: '🔌', title: 'Conectado', desc: 'API y base de datos listas' },
]

const plans = [
  { name: 'Starter', price: '$0', desc: 'Ideal para probar la idea' },
  { name: 'Pro', price: '$19', desc: 'Para lanzar en producción', featured: true },
  { name: 'Equipo', price: '$49', desc: 'Colaboración y soporte' },
]

// URL del backend: vacía en desarrollo (Vite la redirige a :3001 con su proxy).
// En GitHub Pages no hay backend, así que el build de Pages activa el modo demo.
const API_URL = import.meta.env.VITE_API_URL ?? ''
const DEMO = import.meta.env.VITE_DEMO === 'true'

function App() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      if (DEMO) {
        // Versión publicada sin backend: valida igual que la API y simula el envío.
        if (!email.includes('@')) throw new Error('email inválido')
        await new Promise((r) => setTimeout(r, 400))
        setStatus('sent')
        setEmail('')
        return
      }
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('sent')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <section className="text-center py-16">
        <span className="inline-flex items-center gap-1 text-xs text-purple-700 bg-purple-50 px-3 py-1 rounded-md mb-4">
          Nuevo: panel de analítica
        </span>
        <h1 className="text-3xl md:text-4xl font-medium leading-tight mb-3 text-gray-900">
          Lanza tu producto con una página que sí convierte
        </h1>
        <p className="text-gray-600 mb-6">
          Diseño limpio, componentes reutilizables y despliegue full-stack listo en minutos.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto">
          <input
            type="email"
            required
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-10 px-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="h-10 px-5 rounded-md bg-gray-900 text-white text-sm hover:bg-gray-800 disabled:opacity-60"
          >
            {status === 'sending' ? 'Enviando…' : 'Empezar'}
          </button>
        </form>
        {status === 'sent' && <p className="text-sm text-green-700 mt-2">Listo, te contactaremos pronto.</p>}
        {status === 'error' && <p className="text-sm text-red-700 mt-2">Algo falló. Intenta de nuevo.</p>}
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-16">
        {features.map((f) => (
          <div key={f.title} className="bg-gray-50 rounded-lg p-4">
            <div className="text-xl mb-2">{f.icon}</div>
            <p className="font-medium text-sm text-gray-900">{f.title}</p>
            <p className="text-xs text-gray-600">{f.desc}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-20">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-xl p-5 border ${
              p.featured ? 'border-2 border-purple-400' : 'border-gray-200'
            }`}
          >
            {p.featured && (
              <span className="inline-block text-xs text-purple-700 bg-purple-50 px-3 py-1 rounded-md mb-2">
                Más popular
              </span>
            )}
            <p className="font-medium text-sm text-gray-900">{p.name}</p>
            <p className="text-2xl font-medium text-gray-900 mb-2">
              {p.price}
              <span className="text-xs text-gray-500 font-normal"> /mes</span>
            </p>
            <p className="text-xs text-gray-600">{p.desc}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

export default App
