# mi-landing

[![CI](https://github.com/cterry009/mi-landing/actions/workflows/ci.yml/badge.svg)](https://github.com/cterry009/mi-landing/actions/workflows/ci.yml)
[![Pages](https://github.com/cterry009/mi-landing/actions/workflows/pages.yml/badge.svg)](https://github.com/cterry009/mi-landing/actions/workflows/pages.yml)

Landing page full-stack: frontend en Vite + React + Tailwind, backend en Express.

**En línea:** https://cterry009.github.io/mi-landing/ (modo demo: el formulario valida y simula el envío, porque GitHub Pages no corre el backend).

## Desarrollo

En dos terminales:

```bash
cd backend
npm install
npm run dev     # API en http://localhost:3001
```

```bash
cd frontend
npm install
npm run dev     # http://localhost:5173, redirige /api al backend
```

Variables de entorno: ver `frontend/.env.example` y `backend/.env.example`.

## API

| Método | Ruta | Respuesta |
|---|---|---|
| GET | `/api/health` | `{"status": "ok"}` |
| POST | `/api/contact` | `201 {"received": true}` si el email es válido, `400` si no |

## Pruebas

```bash
cd backend && npm test      # node --test
cd frontend && npm run lint && npm run build
```

GitHub Actions corre ambas en cada push y publica el frontend en GitHub Pages.

## Documentación

- [docs/index.html](docs/index.html): presentación con el diagrama interactivo.
- [docs/ARQUITECTURA.md](docs/ARQUITECTURA.md): partes, variables de entorno y decisiones.
- [CHANGELOG.md](CHANGELOG.md): historial de versiones.

## Licencia

[MIT](LICENSE)
