import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 静态站点可能部署在子路径，相对 base 保证素材路径不写死。
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsInlineLimit: 0,
  },
});
