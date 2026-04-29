import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import HomeHero from "@/components/pages/home/HomeHero.vue"
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

describe("HomeHero", () => {
  beforeEach(() => {
    mockLynxEnvironment()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("renders badge with version", () => {
    const wrapper = mountWithPlugins(HomeHero)
    expect(wrapper.text()).toContain("Template v1.0.0")
  })

  it("renders hero title", () => {
    const wrapper = mountWithPlugins(HomeHero)
    expect(wrapper.text()).toContain("Vue Lynx")
  })

  it("renders hero subtitle", () => {
    const wrapper = mountWithPlugins(HomeHero)
    expect(wrapper.text()).toContain("Starter Template")
  })

  it("renders hero description", () => {
    const wrapper = mountWithPlugins(HomeHero)
    expect(wrapper.text()).toContain(
      "A simple template for quickly building mobile applications with Vue Lynx."
    )
  })
})
