import { pluginQRCode } from "@lynx-js/qrcode-rsbuild-plugin"
import { defineConfig } from "@lynx-js/rspeedy"
import { pluginVueLynx } from "vue-lynx/plugin"

export default defineConfig({
  server: {
    host: "127.0.0.1"
  },
  resolve: {
    alias: {
      "@": "./src"
    }
  },
  environments: {
    lynx: {},
    web: {}
  },
  plugins: [
    pluginQRCode({
      schema(url) {
        return `${url}?fullscreen=false`
      }
    }),
    pluginVueLynx({
      optionsApi: false,
      enableCSSInlineVariables: true,
      enableCSSInheritance: true
    })
  ]
})
