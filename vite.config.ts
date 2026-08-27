import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { config } from './src/config.js'

const names = `${config.groom.kg} & ${config.bride.kg}`
const title = `${names} — Үйлөнүү тою`
const description = 'Сиздерди биздин үйлөнүү тоюбузга чакырабыз'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      // Подставляет имена из src/config.ts в <title> и og-теги.
      // Ссылку в WhatsApp/Telegram разворачивают краулеры, которые не выполняют JS,
      // поэтому эти теги должны быть в HTML статически.
      name: 'invite-html-meta',
      transformIndexHtml: (html) =>
        html.replaceAll('%TITLE%', title).replaceAll('%DESCRIPTION%', description),
    },
  ],
})
