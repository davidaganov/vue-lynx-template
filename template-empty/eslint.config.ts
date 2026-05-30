import eslint from "@eslint/js"
import configPrettier from "eslint-config-prettier"
import pluginPrettier from "eslint-plugin-prettier"
import pluginVue from "eslint-plugin-vue"
import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import tseslint from "typescript-eslint"
import vueParser from "vue-eslint-parser"

export default defineConfig(
  globalIgnores([
    "**/dist/**",
    "**/lib/**",
    "**/node_modules/**",
    "**/.github/**",
    "eslint.config.ts",
    "**/*.spec.ts"
  ]),

  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  configPrettier,

  {
    plugins: {
      prettier: pluginPrettier
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        sourceType: "module",
        extraFileExtensions: [".vue"]
      }
    },
    rules: {
      // Prettier rules
      "prettier/prettier": ["error", { endOfLine: "auto" }],

      // Vue rules
      "vue/multi-word-component-names": "off",
      "vue/no-multiple-template-root": "off",
      "vue/valid-v-slot": ["error", { allowModifiers: true }],
      "vue/component-name-in-template-casing": ["error", "PascalCase"],
      "vue/no-v-html": "off",
      "vue/block-order": ["error", { order: ["script", "template", "style"] }],

      // TypeScript & General rules
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "no-prototype-builtins": "off",
      "prefer-spread": "off",
      "no-useless-escape": "off",
      "no-unsafe-optional-chaining": "error",
      "no-self-assign": "off"
    }
  }
)
