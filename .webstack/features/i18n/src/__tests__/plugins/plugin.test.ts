import { mount } from "@vue/test-utils"
import { describe, it, expect } from "vitest"
import { defineComponent } from "vue-lynx"
import { createI18n } from "@/plugins/i18n"

describe("createI18n", () => {
  it("installs $t and $i18n on app", () => {
    const plugin = createI18n({ defaultLocale: "en" })

    const Comp = defineComponent({
      template: "<view>{{ $t('home.hero.title') }}</view>"
    })

    const wrapper = mount(Comp, {
      global: {
        plugins: [plugin]
      }
    })

    expect(wrapper.text()).toBe("Vue Lynx")
  })

  it("translates with interpolation", () => {
    const plugin = createI18n({ defaultLocale: "en" })

    const Comp = defineComponent({
      template: '<view>{{ $t("home.badge", { version: "2.0" }) }}</view>'
    })

    const wrapper = mount(Comp, {
      global: {
        plugins: [plugin]
      }
    })

    expect(wrapper.text()).toBe("Template v2.0")
  })

  it("switches locale via $i18n.setLocale", async () => {
    const plugin = createI18n({ defaultLocale: "en" })

    const Comp = defineComponent({
      template: '<view>{{ $t("home.hero.title") }}</view>'
    })

    const wrapper = mount(Comp, {
      global: {
        plugins: [plugin]
      }
    })

    expect(wrapper.text()).toBe("Vue Lynx")

    wrapper.vm.$i18n.setLocale("ru")
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toBe("Vue Lynx")
  })

  it("falls back to key when translation missing", () => {
    const plugin = createI18n({ defaultLocale: "en" })

    const Comp = defineComponent({
      template: '<view>{{ $t("nonexistent.key") }}</view>'
    })

    const wrapper = mount(Comp, {
      global: {
        plugins: [plugin]
      }
    })

    expect(wrapper.text()).toBe("nonexistent.key")
  })
})
