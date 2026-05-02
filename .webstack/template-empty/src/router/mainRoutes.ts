import type { RouteRecordRaw } from "vue-router"
import { ROUTE_PATH, ROUTE_NAME } from "@/types"
import DefaultLayout from "@/layouts/default.vue"
import AboutView from "@/views/AboutView.vue"
import HomeView from "@/views/HomeView.vue"

export const routes: RouteRecordRaw[] = [
  {
    path: ROUTE_PATH.HOME,
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: ROUTE_NAME.HOME,
        component: HomeView
      },
      {
        path: ROUTE_PATH.ABOUT,
        name: ROUTE_NAME.ABOUT,
        component: AboutView
      }
    ]
  }
]
