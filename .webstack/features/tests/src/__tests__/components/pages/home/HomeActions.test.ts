import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import HomeActions from "@/components/pages/home/HomeActions.vue"
import { mountWithPlugins } from "@/__tests__/utils"

function mockLynxEnvironment(width = 750, height = 1334) {
  vi.stubGlobal("lynx", {
    getSystemInfoSync: vi.fn(() => ({
      pixelWidth: width,
      pixelHeight: height,
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
    pixelWidth: width,
    pixelHeight: height
  })
}

describe("HomeActions", () => {
  beforeEach(() => {
    mockLynxEnvironment()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("renders get started button", () => {
    const wrapper = mountWithPlugins(HomeActions)
    expect(wrapper.text()).toContain("Get Started")
  })

  it("renders read more button", () => {
    const wrapper = mountWithPlugins(HomeActions)
    expect(wrapper.text()).toContain("Read More")
  })

  it("renders two UiButton components", () => {
    const wrapper = mountWithPlugins(HomeActions)
    const buttons = wrapper.findAllComponents({ name: "UiButton" })
    expect(buttons).toHaveLength(2)
  })

  it("has read more button as link", () => {
    const wrapper = mountWithPlugins(HomeActions)
    const buttons = wrapper.findAllComponents({ name: "UiButton" })
    expect(buttons[1].props("to")).toEqual({ name: "about" })
  })

  it("applies responsive row layout for large screens (md)", async () => {
    mockLynxEnvironment(1600, 900)
    const wrapper = mountWithPlugins(HomeActions)
    await wrapper.vm.$nextTick()
    const root = wrapper.find("view")
    expect(root.classes()).toContain("home-actions--row")
  })

  it("calls handleGetStarted when primary button is clicked", async () => {
    const consoleSpy = vi.spyOn(console, "log")
    const wrapper = mountWithPlugins(HomeActions)
    const primaryButton = wrapper.findComponent({ name: "UiButton" })
    await (primaryButton.vm as any).$emit("click")
    expect(consoleSpy).toHaveBeenCalledWith("Get Started")
    consoleSpy.mockRestore()
  })
})
