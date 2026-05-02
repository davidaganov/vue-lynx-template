import { describe, it, expect, beforeEach } from "vitest"
import { setActivePinia, createPinia } from "pinia"
import { useAppStore } from "@/stores/app"

describe("useAppStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it("has default version", () => {
    const store = useAppStore()
    expect(store.version).toBe("1.0.0")
  })

  it("has default isInitialized false", () => {
    const store = useAppStore()
    expect(store.isInitialized).toBe(false)
  })

  it("can set initialized to true", () => {
    const store = useAppStore()
    store.setInitialized(true)
    expect(store.isInitialized).toBe(true)
  })

  it("can set initialized to false", () => {
    const store = useAppStore()
    store.setInitialized(true)
    store.setInitialized(false)
    expect(store.isInitialized).toBe(false)
  })
})
