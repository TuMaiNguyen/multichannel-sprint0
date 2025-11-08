// frontend/vite.config.js
export default {
  // Quan trọng: base phải trùng tên repo để GitHub Pages load đúng asset
  base: '/multichannel-sprint0/',
  build: {
    // Build ra thư mục /docs ở GỐC repo (để GitHub Pages đọc)
    outDir: '../docs',
    emptyOutDir: true
  }
};
