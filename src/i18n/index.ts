import en from "@/i18n/locales/en.json"
import ru from "@/i18n/locales/ru.json"

/**
 * Locale registry.
 * To add a new language, just add an import and an entry here.
 * All types (Locale, Messages) are derived automatically.
 */
export const locales = { en, ru } as const

/**
 * Composables for i18n
 */
export { useI18n } from "./useI18n"

/**
 * Plugin for i18n
 */
export { createI18n, type I18nInstance } from "./plugin"

/**
 * Type aliases for i18n
 */
export type { TranslationKey, Locale, Messages } from "./types"
