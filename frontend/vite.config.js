import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  base: '/multichannel-sprint0/',        // để GH Pages không 404 khi refresh
  build: { outDir: '../docs' },          // build ra ../docs cho GH Pages
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } }, // alias tiện dùng
  server: { port: 5173 },
});
