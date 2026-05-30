import preset from "@lynx-js/tailwind-preset"
import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{vue,js,ts}"],
  presets: [preset],
  theme: {
    extend: {
      colors: {
        background: "#050a14",
        primary: {
          DEFAULT: "#8b5cf6",
          hover: "#7c3aed",
          dark: "#6d28d9"
        },
        secondary: {
          DEFAULT: "#1e293b",
          dark: "#0f172a"
        }
      }
    }
  }
}

export default config
