import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GH Pages xuất dưới /multichannel-sprint0/
export default defineConfig({
  plugins: [react()],
  base: '/multichannel-sprint0/',
});
