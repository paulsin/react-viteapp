import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from 'vite-plugin-svgr'; 

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      "/backend": {
        target: "http://localhost:3000", // Proxy API requests to backend
        changeOrigin: true,
        secure: false,
      },
   
      // build: {
      //   chunkSizeWarningLimit: 1000, // Increases limit from 500KB to 1000KB
      // },
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              // You can define custom chunk names
              vendor: ['bootstrap', 'axios','compressorjs','lucide-react','notistack','react-qr-code','react-select','to-words'],
 
            }
          }
        }
      },
      optimizeDeps: {
        include: ['react-router-dom']
      },
   
    },
  },
});