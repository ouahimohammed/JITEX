import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://volapi-cdwxxnlak-ouahimohammeds-projects.vercel.app', // L'URL de ton API sur Vercel
        changeOrigin: true, // Pour éviter les problèmes de CORS
        secure: true, // Si ton API utilise HTTP au lieu de HTTPS, sinon mets-le à `true`
      },
    },
  },
});
