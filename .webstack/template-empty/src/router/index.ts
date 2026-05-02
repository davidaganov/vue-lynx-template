import { createMemoryHistory, createRouter } from "vue-router"
import { routes } from "@/router/mainRoutes"

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

/**
 * The Lynx environment lacks an address bar (window.location), so the router
 * defaults to an "empty" state when using MemoryHistory.
 * We force a navigation to "/" to activate the initial route upon loading.
 */
router.push("/")

export default router
