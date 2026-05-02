import type { MountingOptions } from "@vue/test-utils"
import { mount } from "@vue/test-utils"
import type { Component } from "vue-lynx"
import { createRouter, createMemoryHistory } from "vue-router"
// @webstack:test-utils-imports
import { ROUTE_NAME, ROUTE_PATH } from "@/types"

export function mountWithPlugins(
  component: Component,
  options: Omit<MountingOptions<any>, "global"> & {
    global?: Omit<MountingOptions<any>["global"], "plugins">
  } = {}
) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: ROUTE_PATH.HOME,
        name: ROUTE_NAME.HOME,
        component: { template: "<view>home</view>" }
      },
      {
        path: ROUTE_PATH.ABOUT,
        name: ROUTE_NAME.ABOUT,
        component: { template: "<view>about</view>" }
      }
    ]
  })

  router.push(ROUTE_PATH.HOME)

  return mount(component, {
    global: {
      plugins: [
        router,
        // @webstack:test-utils-plugins
      ],
      ...options.global
    },
    attachTo: document.body,
    ...options
  })
}
