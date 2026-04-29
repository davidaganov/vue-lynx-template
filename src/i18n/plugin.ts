import { ref, computed, type Plugin, type App, type Ref, type ComputedRef } from "vue"
import { locales } from "./index"
import type { Locale, Messages, TranslationKey } from "./types"

export const I18nInjectionKey = Symbol("i18n")

export interface I18nInstance {
  locale: Ref<Locale>
  messages: ComputedRef<Messages>
  setLocale: (value: Locale) => void
  t: (key: TranslationKey, params?: Record<string, string | number>) => string
}

/**
 * Resolves a dot-separated key path in the messages object.
 * e.g. "home.hero.title" → messages.home.hero.title
 */
const resolvePath = (obj: Record<string, unknown>, path: string): string => {
  const parts = path.split(".")
  let current: unknown = obj

  for (const part of parts) {
    if (current == null || typeof current !== "object") return path
    current = (current as Record<string, unknown>)[part]
  }

  return typeof current === "string" ? current : path
}

/**
 * Replaces `{key}` placeholders in a string with values from `params`.
 */
const interpolate = (template: string, params?: Record<string, string | number>): string => {
  if (!params) return template

  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const val = params[key]
    return val !== undefined ? String(val) : `{${key}}`
  })
}

export const createI18n = (options: { defaultLocale: Locale }): Plugin => {
  return {
    install(app: App) {
      const locale = ref<Locale>(options.defaultLocale)
      const messages = computed<Messages>(() => locales[locale.value])

      const setLocale = (value: Locale) => {
        locale.value = value
      }

      const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
        const raw = resolvePath(messages.value as unknown as Record<string, unknown>, key)
        return interpolate(raw, params)
      }

      const i18n: I18nInstance = {
        locale,
        messages,
        setLocale,
        t
      }

      // Provide for composition API
      app.provide(I18nInjectionKey, i18n)

      // Inject for Options API and template
      app.config.globalProperties.$t = t
      app.config.globalProperties.$i18n = i18n
    }
  }
}
