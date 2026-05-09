import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import AboutInfo from "@/components/pages/about/AboutInfo.vue"
import AboutPage from "@/components/pages/about/AboutPage.vue"
import { mountWithPlugins } from "@/__tests__/utils"

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

describe("AboutPage", () => {
  beforeEach(() => {
    mockLynxEnvironment()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("renders about title", () => {
    const wrapper = mountWithPlugins(AboutPage)
    expect(wrapper.text()).toContain("About")
  })

  it("renders about description", () => {
    const wrapper = mountWithPlugins(AboutPage)
    expect(wrapper.text()).toContain("This template is a starting point for your Vue Lynx project.")
  })

  it("renders AboutInfo component", () => {
    const wrapper = mountWithPlugins(AboutPage)
    expect(wrapper.findComponent(AboutInfo).exists()).toBe(true)
  })

  it("renders return button", () => {
    const wrapper = mountWithPlugins(AboutPage)
    expect(wrapper.text()).toContain("Return")
  })

  it("has return button as link to home", () => {
    const wrapper = mountWithPlugins(AboutPage)
    const button = wrapper.findComponent({ name: "UiButton" })
    expect(button.props("to")).toEqual({ name: "home" })
  })
})
