import type { Ref, ComputedRef } from "vue"
import type { messagesMap } from "@/i18n"
import type { LOCALES } from "./enums/locales.enum"

export type TranslationKey = string

export interface I18nInstance {
  locale: Ref<LOCALES>
  messages: ComputedRef<(typeof messagesMap)[LOCALES]>
  setLocale: (value: LOCALES) => void
  t: (key: TranslationKey, params?: Record<string, string | number>) => string
}
