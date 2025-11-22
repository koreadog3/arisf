import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // 정적 배포에서 경로 문제 최소화(assets 상대경로)
  base: "./",

  build: {
    outDir: "dist",
    sourcemap: false
  },

  server: {
    port: 5173,
    proxy: {
      // dev에서는 프론트(5173) → 백엔드(8000)
      "/ews": "http://localhost:8000",
      "/risk": "http://localhost:8000",
      "/run": "http://localhost:8000"
    }
  }
});
