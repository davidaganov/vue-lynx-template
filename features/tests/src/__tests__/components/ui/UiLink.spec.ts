import { mount } from "@vue/test-utils"
import { describe, it, expect } from "vitest"
import { createRouter, createMemoryHistory } from "vue-router"
import UiLink from "@/components/ui/UiLink.vue"

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

describe("UiLink", () => {
  it("renders slot content", () => {
    const router = createTestRouter()
    const wrapper = mount(UiLink, {
      global: {
        plugins: [router]
      },
      props: {
        to: { name: "home" }
      },
      slots: {
        default: "<view>Link content</view>"
      }
    })

    expect(wrapper.text()).toContain("Link content")
  })

  it("passes navigate and isActive to scoped slot", async () => {
    const router = createTestRouter()
    const wrapper = mount(UiLink, {
      global: {
        plugins: [router]
      },
      props: {
        to: { name: "home" }
      },
      slots: {
        default: `<template #default="{ navigate, isActive }">
          <view class="slot-content" @tap="navigate">{{ isActive }}</view>
        </template>`
      }
    })

    expect(wrapper.find(".slot-content").exists()).toBe(true)
  })

  it("renders RouterLink internally", () => {
    const router = createTestRouter()
    const wrapper = mount(UiLink, {
      global: {
        plugins: [router]
      },
      props: {
        to: { name: "home" }
      },
      slots: {
        default: "<view>Link</view>"
      }
    })

    expect(wrapper.findComponent({ name: "RouterLink" }).exists()).toBe(true)
  })
})
