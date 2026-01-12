import { defineConfig } from "vite"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  esbuild: {
    jsxImportSource: "preact",
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsxInject: 'import { h, Fragment } from "preact"',
  },
  plugins: [tailwindcss()],
})
