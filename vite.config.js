import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import svgr from 'vite-plugin-svgr'
import dynamicImport from 'vite-plugin-dynamic-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      // Opsi konfigurasi, jika diperlukan
      svgrOptions: {
        // Contoh: mengatur ikon untuk memiliki properti seperti title
        icon: true,
      },
    }),
    dynamicImport()
  ],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3003
  },
  preview: {
    port: 3003
  },

})