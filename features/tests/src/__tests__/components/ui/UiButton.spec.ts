import { mount } from "@vue/test-utils"
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { createRouter, createMemoryHistory } from "vue-router"
import UiButton from "@/components/ui/UiButton.vue"

function createTestRouter() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: "/",
        name: "home",
        component: { template: "<view>home</view>" }
      },
      {
        path: "/about",
        name: "about",
        component: { template: "<view>about</view>" }
      }
    ]
  })
  router.push("/")
  return router
}

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

describe("UiButton", () => {
  beforeEach(() => {
    mockLynxEnvironment()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("renders default slot text", () => {
    const wrapper = mount(UiButton, {
      props: { type: "primary" },
      slots: { default: "Click me" }
    })
    expect(wrapper.text()).toContain("Click me")
  })

  it("applies primary variant class", () => {
    const wrapper = mount(UiButton, {
      props: { type: "primary" },
      slots: { default: "Primary" }
    })
    const inner = wrapper.findAll("view")[1]
    expect(inner.classes().join(" ")).toContain("ui-button__inner--primary")
  })

  it("applies outline variant classes", () => {
    const wrapper = mount(UiButton, {
      props: { type: "outline" },
      slots: { default: "Outline" }
    })
    const inner = wrapper.findAll("view")[1]
    const cls = inner.classes().join(" ")
    expect(cls).toContain("ui-button__inner--outline")
  })

  it("shows loading text instead of slot", () => {
    const wrapper = mount(UiButton, {
      props: { type: "primary", loading: true },
      slots: { default: "Click me" }
    })
    expect(wrapper.text()).toContain("Loading...")
    expect(wrapper.text()).not.toContain("Click me")
  })

  it("applies blocked state when loading is true", () => {
    const wrapper = mount(UiButton, {
      props: { type: "primary", loading: true }
    })
    const inner = wrapper.findAll("view")[1]
    const cls = inner.classes().join(" ")
    expect(cls).toContain("ui-button__inner--blocked")
  })

  it("emits click on tap", async () => {
    const wrapper = mount(UiButton, {
      props: { type: "primary" },
      slots: { default: "Click me" }
    })

    await wrapper.findAll("view")[1].trigger("tap")
    expect(wrapper.emitted("click")).toHaveLength(1)
  })

  it("does not emit click when disabled", async () => {
    const wrapper = mount(UiButton, {
      props: { type: "primary", disabled: true },
      slots: { default: "Click me" }
    })

    await wrapper.findAll("view")[1].trigger("tap")
    expect(wrapper.emitted("click")).toBeUndefined()
  })

  it("does not emit click when loading", async () => {
    const wrapper = mount(UiButton, {
      props: { type: "primary", loading: true },
      slots: { default: "Click me" }
    })

    await wrapper.findAll("view")[1].trigger("tap")
    expect(wrapper.emitted("click")).toBeUndefined()
  })

  it("renders as link when to prop provided", async () => {
    const router = createTestRouter()
    const wrapper = mount(UiButton, {
      global: {
        plugins: [router]
      },
      props: {
        type: "primary",
        to: { name: "about" }
      },
      slots: { default: "Navigate" }
    })

    expect(wrapper.findComponent({ name: "UiLink" }).exists()).toBe(true)
  })

  it("calls navigate when link button is tapped", async () => {
    const router = createTestRouter()
    const pushSpy = vi.spyOn(router, "push")
    const wrapper = mount(UiButton, {
      global: {
        plugins: [router]
      },
      props: {
        type: "primary",
        to: "/about"
      },
      slots: { default: "Navigate" }
    })

    await wrapper.findAll("view")[1].trigger("tap")
    expect(pushSpy).toHaveBeenCalled()
  })

  it("renders as view when no to prop", () => {
    const wrapper = mount(UiButton, {
      props: { type: "primary" },
      slots: { default: "No link" }
    })

    expect(wrapper.findComponent({ name: "UiLink" }).exists()).toBe(false)
  })
})
