import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: path.resolve("src"),
  envDir: path.resolve(),
  publicDir: path.resolve("public"),

  plugins: [react()],

  build: {
    outDir: path.resolve("dist"),
    emptyOutDir: true,
  },
});
