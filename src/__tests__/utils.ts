import type { MountingOptions } from "@vue/test-utils"
import { mount } from "@vue/test-utils"
import type { Component } from "vue-lynx"
import { createRouter, createMemoryHistory } from "vue-router"
import { createPinia } from "pinia"
import { createI18n, LOCALES } from "@/i18n"
import { ROUTE_NAME, ROUTE_PATH } from "@/types"

export function mountWithPlugins(
  component: Component,
  options: Omit<MountingOptions<any>, "global"> & {
    global?: Omit<MountingOptions<any>["global"], "plugins">
  } = {}
) {
  const pinia = createPinia()

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

  const i18n = createI18n({ defaultLocale: LOCALES.EN })

  return mount(component, {
    global: {
      plugins: [pinia, router, i18n],
      ...options.global
    },
    attachTo: document.body,
    ...options
  })
}
