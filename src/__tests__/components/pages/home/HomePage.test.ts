import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import HomePage from "@/components/pages/home/HomePage.vue"
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

describe("HomePage", () => {
  beforeEach(() => {
    mockLynxEnvironment()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("renders HomeHero and HomeActions", () => {
    const wrapper = mountWithPlugins(HomePage)

    expect(wrapper.findComponent({ name: "HomeHero" }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: "HomeActions" }).exists()).toBe(true)
  })

  it("has centered layout classes", () => {
    const wrapper = mountWithPlugins(HomePage)
    const root = wrapper.find("view")
    const cls = root.classes().join(" ")

    expect(cls).toContain("flex-col")
    expect(cls).toContain("items-center")
    expect(cls).toContain("justify-center")
  })
})
