import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const isProd = mode === 'production'
  const repoBase = (env.VITE_APP_BASENAME || '').replace(/^\/|\/$/g, '')
  return defineConfig({
    plugins: [react()],
    base: isProd && repoBase ? `/${repoBase}/` : '/', // DEV = '/', PROD = '/multichannel-sprint0/'
  })
}
