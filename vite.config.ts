import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname),
      "~backend/client": path.resolve(__dirname, "client.ts")
    }
  },

  server: {
  proxy: {
    "/api": {
      target: "http://anesu.monecuer.com",
      changeOrigin: true,
      secure: false,
      rewrite: (path) => path
    }
  }
}

});
