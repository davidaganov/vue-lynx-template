import { mount } from "@vue/test-utils"
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import UiLanguageSwitcher from "@/components/ui/UiLanguageSwitcher.vue"
import { createI18n } from "@/plugins/i18n"

function mockLynxEnvironment() {
  vi.stubGlobal("lynx", {
    getSystemInfoSync: vi.fn(() => ({
      pixelWidth: 750,
      pixelHeight: 1334,
      pixelRatio: 2,
      platform: "iOS",
      safeArea: { top: 44, bottom: 34, left: 0, right: 0 }
    })),
    addGlobalEventListener: vi.fn(),
    removeGlobalEventListener: vi.fn()
  })
  vi.stubGlobal("SystemInfo", {
    pixelRatio: 2,
    platform: "iOS",
    pixelWidth: 750,
    pixelHeight: 1334
  })
}

describe("UiLanguageSwitcher", () => {
  beforeEach(() => {
    mockLynxEnvironment()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("renders available locales", () => {
    const wrapper = mount(UiLanguageSwitcher, {
      global: {
        plugins: [createI18n({ defaultLocale: "en" })]
      }
    })

    expect(wrapper.text()).toContain("en")
    expect(wrapper.text()).toContain("ru")
  })

  it("marks current locale as active", () => {
    const wrapper = mount(UiLanguageSwitcher, {
      global: {
        plugins: [createI18n({ defaultLocale: "en" })]
      }
    })

    const texts = wrapper.findAll("text")
    const activeText = texts.find((t) => t.classes().includes("text-primary"))

    expect(activeText?.text()).toBe("en")
  })

  it("switches locale on tap", async () => {
    const wrapper = mount(UiLanguageSwitcher, {
      global: {
        plugins: [createI18n({ defaultLocale: "en" })]
      }
    })

    const localeViews = wrapper.findAll("view")
    // localeViews[0] is root, [1] is "en", [2] is "ru"
    await localeViews[2].trigger("tap")
    await wrapper.vm.$nextTick()

    const texts = wrapper.findAll("text")
    const activeText = texts.find((t) => t.classes().includes("text-primary"))

    expect(activeText?.text()).toBe("ru")
  })
})
