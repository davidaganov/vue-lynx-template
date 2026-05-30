import type { Plugin, App } from "vue"
import { ref, computed } from "vue-lynx"
import { messagesMap } from "@/i18n"
import { LOCALES, type TranslationKey, type I18nInstance } from "@/types"

export const I18nInjectionKey = Symbol("i18n")

const resolvePath = (obj: Record<string, unknown>, path: string): string => {
  const parts = path.split(".")
  let current: unknown = obj

  for (const part of parts) {
    if (current == null || typeof current !== "object") return path
    current = (current as Record<string, unknown>)[part]
  }

  return typeof current === "string" ? current : path
}

const interpolate = (template: string, params?: Record<string, string | number>): string => {
  if (!params) return template

  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const val = params[key]
    return val !== undefined ? String(val) : `{${key}}`
  })
}

export const createI18n = (options: { defaultLocale: LOCALES }): Plugin => {
  return {
    install(app: App) {
      const locale = ref<LOCALES>(options.defaultLocale)
      const messages = computed(() => messagesMap[locale.value])

      const setLocale = (value: LOCALES) => {
        locale.value = value
      }

      const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
        const raw = resolvePath(messages.value as Record<string, unknown>, key)
        return interpolate(raw, params)
      }

      const i18n: I18nInstance = {
        locale,
        messages,
        setLocale,
        t
      }

      app.provide(I18nInjectionKey, i18n)

      app.config.globalProperties.$t = t
      app.config.globalProperties.$i18n = i18n
    }
  }
}

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $t: (key: TranslationKey, params?: Record<string, string | number>) => string
    $i18n: I18nInstance
  }
}
