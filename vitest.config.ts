import vue from "@vitejs/plugin-vue"
import path from "path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [vue()],
  define: {
    __DEV__: "true",
    __VUE_LYNX_AUTO_PIXEL_UNIT__: "true"
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "vue-lynx": path.resolve(__dirname, "./node_modules/vue-lynx/runtime/dist/index.js")
    }
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.ts"]
  }
})
