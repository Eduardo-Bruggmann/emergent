import { defineConfig } from "vite"
import tailwindcss from "@tailwindcss/vite"
import path from "path"

export default defineConfig({
  esbuild: {
    jsxImportSource: "preact",
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsxInject: 'import { h, Fragment } from "preact"',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [tailwindcss()],
})
