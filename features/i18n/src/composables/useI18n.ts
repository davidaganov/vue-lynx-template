import { inject } from "vue-lynx"
import { I18nInjectionKey, type I18nInstance } from "@/i18n"

export const useI18n = (): I18nInstance => {
  const i18n = inject<I18nInstance>(I18nInjectionKey)

  if (!i18n) {
    throw new Error("useI18n() called without i18n provider. Make sure to use app.use(i18nPlugin).")
  }

  return i18n
}
