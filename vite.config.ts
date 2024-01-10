/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import path from "node:path"
import electron from "vite-plugin-electron/simple"
import pkg from "./package.json"

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isServe = command === "serve"
  const isBuild = command === "build"
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG

  const env = loadEnv(mode, process.cwd(), "")
  const electronPlugins = [
    electron({
      main: {
        entry: "electron/main/index.ts",
        onstart(args) {
          if (process.env.VSCODE_DEBUG) {
            console.log(/* For `.vscode/.debug.script.mjs` */ "[startup] Electron App")
          } else {
            args.startup()
          }
        },
        vite: {
          build: {
            sourcemap,
            minify: isBuild,
            outDir: "dist-electron/main",
            rollupOptions: {
              external: Object.keys("dependencies" in pkg ? pkg.dependencies : {}),
            },
          },
        },
      },
      preload: {
        input: "electron/preload/index.ts",
        vite: {
          build: {
            sourcemap: sourcemap ? "inline" : undefined,
            minify: isBuild,
            outDir: "dist-electron/preload",
            rollupOptions: {
              external: Object.keys("dependencies" in pkg ? pkg.dependencies : {}),
            },
          },
        },
      },
      renderer: {},
    }),
  ]

  return {
    test: {},
    plugins: [react(), env.VITE_MODE === "electron" ? electronPlugins : []],
    resolve: {
      alias: {
        "@": path.join(__dirname, "src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id.toString().split("node_modules/")[1].split("/")[0].toString()
            }
          },
        },
      },
    },
  }
})
