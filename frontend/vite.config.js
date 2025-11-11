// frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // Dev chạy "/" cho gọn; build production lên GH Pages dùng base repo
  base: mode === 'production' ? '/multichannel-sprint0/' : '/',
}))
