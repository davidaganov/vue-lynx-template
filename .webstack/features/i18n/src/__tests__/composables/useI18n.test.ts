import { mount } from "@vue/test-utils"
import { describe, it, expect } from "vitest"
import { defineComponent, h } from "vue-lynx"
import { useI18n, LOCALES, createI18n } from "@/i18n"

describe("useI18n", () => {
  it("throws when no provider installed", () => {
    const Comp = defineComponent({
      setup() {
        useI18n()
        return () => h("view")
      }
    })

    expect(() => mount(Comp)).toThrow("useI18n() called without i18n provider")
  })

  it("returns locale, setLocale and t when plugin installed", () => {
    const plugin = createI18n({ defaultLocale: LOCALES.EN })
    let result: ReturnType<typeof useI18n>

    const Comp = defineComponent({
      setup() {
        result = useI18n()
        return () => h("view")
      }
    })

    mount(Comp, {
      global: {
        plugins: [plugin]
      }
    })

    expect(result!.locale.value).toBe(LOCALES.EN)
    expect(result!.t("home.hero.title")).toBe("Vue Lynx")
  })

  it("translates with params via t", () => {
    const plugin = createI18n({ defaultLocale: LOCALES.EN })
    let result: ReturnType<typeof useI18n>

    const Comp = defineComponent({
      setup() {
        result = useI18n()
        return () => h("view")
      }
    })

    mount(Comp, {
      global: {
        plugins: [plugin]
      }
    })

    expect(result!.t("home.badge", { version: "1.0" })).toBe("Template v1.0")
  })

  it("changes locale via setLocale", async () => {
    const plugin = createI18n({ defaultLocale: LOCALES.EN })
    let result: ReturnType<typeof useI18n>

    const Comp = defineComponent({
      setup() {
        result = useI18n()
        return () => h("view")
      }
    })

    mount(Comp, {
      global: {
        plugins: [plugin]
      }
    })

    result!.setLocale(LOCALES.RU)
    expect(result!.locale.value).toBe(LOCALES.RU)
  })
})
