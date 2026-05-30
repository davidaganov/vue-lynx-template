import enMessages from "@/i18n/locales/en.json"
import ruMessages from "@/i18n/locales/ru.json"

export const messagesMap = {
  en: enMessages,
  ru: ruMessages
}

/**
 * Composables for i18n
 */
export { useI18n } from "@/composables/useI18n"

/**
 * Plugin for i18n
 */
export { I18nInjectionKey, createI18n } from "@/plugins/i18n"

/**
 * Type aliases for i18n
 */
export { type TranslationKey, type I18nInstance, LOCALES } from "@/types"
