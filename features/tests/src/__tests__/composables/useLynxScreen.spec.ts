import { mount } from "@vue/test-utils"
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { defineComponent, h } from "vue-lynx"
import { useLynxScreen } from "@/composables/useLynxScreen"

function mountComposable<T>(composable: () => T) {
  let result!: T
  const Comp = defineComponent({
    setup() {
      result = composable()
      return () => h("view")
    }
  })
  const wrapper = mount(Comp)
  return { result, wrapper }
}

describe("useLynxScreen", () => {
  let lynxMock: {
    getSystemInfoSync: ReturnType<typeof vi.fn>
    addGlobalEventListener: ReturnType<typeof vi.fn>
    removeGlobalEventListener: ReturnType<typeof vi.fn>
  }
  let listeners: Record<string, Array<(...args: any[]) => void>>
  let systemInfoMock: {
    pixelRatio: number
    platform: string
    pixelWidth: number
    pixelHeight: number
  }

  beforeEach(() => {
    listeners = {}
    lynxMock = {
      getSystemInfoSync: vi.fn(),
      addGlobalEventListener: vi.fn((event: string, listener: (...args: any[]) => void) => {
        if (!listeners[event]) listeners[event] = []
        listeners[event].push(listener)
      }),
      removeGlobalEventListener: vi.fn((event: string, listener: (...args: any[]) => void) => {
        if (listeners[event]) {
          listeners[event] = listeners[event].filter((l) => l !== listener)
        }
      })
    }

    systemInfoMock = {
      pixelRatio: 2,
      platform: "iOS",
      pixelWidth: 750,
      pixelHeight: 1334
    }

    vi.stubGlobal("lynx", lynxMock)
    vi.stubGlobal("SystemInfo", systemInfoMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("reads dimensions from lynx.getSystemInfoSync on mount", () => {
    lynxMock.getSystemInfoSync.mockReturnValue({
      pixelWidth: 750,
      pixelHeight: 1334,
      pixelRatio: 2,
      platform: "Android",
      safeArea: {
        top: 44,
        bottom: 34,
        left: 0,
        right: 0
      }
    })

    const { result } = mountComposable(useLynxScreen)

    expect(result.width.value).toBe(375) // 750 / 2
    expect(result.height.value).toBe(667) // 1334 / 2
    expect(result.pixelRatio.value).toBe(2)
    expect(result.platform.value).toBe("ios") // from SystemInfo.platform
    expect(result.isIOS.value).toBe(true)
    expect(result.isAndroid.value).toBe(false)
    expect(result.isPortrait.value).toBe(true)
    expect(result.isLandscape.value).toBe(false)
    expect(result.safeArea.value).toEqual({
      top: 44,
      bottom: 34,
      left: 0,
      right: 0
    })
    expect(result.sm.value).toBe(false) // 375 < 640
    expect(result.md.value).toBe(false)
    expect(result.lg.value).toBe(false)
    expect(result.xl.value).toBe(false)
    expect(result.xxl.value).toBe(false)
  })

  it("registers a windowresize listener on mount", () => {
    lynxMock.getSystemInfoSync.mockReturnValue({
      pixelWidth: 750,
      pixelHeight: 1334,
      pixelRatio: 2
    })

    mountComposable(useLynxScreen)

    expect(lynxMock.addGlobalEventListener).toHaveBeenCalledTimes(1)
    expect(lynxMock.addGlobalEventListener).toHaveBeenCalledWith(
      "windowresize",
      expect.any(Function)
    )
  })

  it("removes the windowresize listener on unmount", () => {
    lynxMock.getSystemInfoSync.mockReturnValue({
      pixelWidth: 750,
      pixelHeight: 1334,
      pixelRatio: 2
    })

    const { wrapper } = mountComposable(useLynxScreen)
    wrapper.unmount()

    expect(lynxMock.removeGlobalEventListener).toHaveBeenCalledTimes(1)
    expect(lynxMock.removeGlobalEventListener).toHaveBeenCalledWith(
      "windowresize",
      expect.any(Function)
    )
  })

  it("updates dimensions when windowresize fires", () => {
    lynxMock.getSystemInfoSync
      .mockReturnValueOnce({
        pixelWidth: 750,
        pixelHeight: 1334,
        pixelRatio: 2
      })
      .mockReturnValueOnce({
        pixelWidth: 1334,
        pixelHeight: 750,
        pixelRatio: 2
      })

    const { result } = mountComposable(useLynxScreen)
    expect(result.width.value).toBe(375)
    expect(result.height.value).toBe(667)
    expect(result.isPortrait.value).toBe(true)

    // Simulate windowresize event
    const resizeListener = listeners["windowresize"][0]
    resizeListener()

    expect(result.width.value).toBe(667)
    expect(result.height.value).toBe(375)
    expect(result.isPortrait.value).toBe(false)
    expect(result.isLandscape.value).toBe(true)
  })

  it("falls back to SystemInfo when getSystemInfoSync throws", () => {
    lynxMock.getSystemInfoSync.mockImplementation(() => {
      throw new Error("Not available")
    })

    const { result } = mountComposable(useLynxScreen)
    expect(result.width.value).toBe(375) // systemInfoMock.pixelWidth / systemInfoMock.pixelRatio
    expect(result.height.value).toBe(667)
  })

  it("falls back to SystemInfo with ratio 1 when ratio is 0 in SystemInfo", () => {
    lynxMock.getSystemInfoSync.mockImplementation(() => {
      throw new Error("Not available")
    })
    vi.stubGlobal("SystemInfo", {
      ...systemInfoMock,
      pixelRatio: 0
    })

    const { result } = mountComposable(useLynxScreen)
    expect(result.width.value).toBe(systemInfoMock.pixelWidth)
  })

  it("uses safeArea defaults when getSystemInfoSync omits safeArea", () => {
    lynxMock.getSystemInfoSync.mockReturnValue({
      pixelWidth: 640,
      pixelHeight: 1136,
      pixelRatio: 2
    })

    const { result } = mountComposable(useLynxScreen)

    expect(result.safeArea.value).toEqual({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    })
  })

  it("updates breakpoints correctly for different widths", () => {
    lynxMock.getSystemInfoSync.mockReturnValue({
      pixelWidth: 2560,
      pixelHeight: 1440,
      pixelRatio: 2
    })

    const { result } = mountComposable(useLynxScreen)

    expect(result.width.value).toBe(1280)
    expect(result.sm.value).toBe(true)
    expect(result.md.value).toBe(true)
    expect(result.lg.value).toBe(true)
    expect(result.xl.value).toBe(true)
    expect(result.xxl.value).toBe(false)
  })

  it("allows manual refresh to update metrics", () => {
    lynxMock.getSystemInfoSync
      .mockReturnValueOnce({
        pixelWidth: 750,
        pixelHeight: 1334,
        pixelRatio: 2
      })
      .mockReturnValueOnce({
        pixelWidth: 1200,
        pixelHeight: 800,
        pixelRatio: 2
      })

    const { result } = mountComposable(useLynxScreen)
    expect(result.width.value).toBe(375)

    result.refresh()
    expect(result.width.value).toBe(600)
    expect(result.height.value).toBe(400)
  })

  it("defaults pixelRatio to 1 if missing in getSystemInfoSync", () => {
    lynxMock.getSystemInfoSync.mockReturnValue({
      pixelWidth: 375,
      pixelHeight: 667
      // pixelRatio is missing
    })

    const { result } = mountComposable(useLynxScreen)
    expect(result.width.value).toBe(375)
    expect(result.height.value).toBe(667)
  })

  it("handles partial safeArea data", () => {
    // Test case 1: some present, some missing
    lynxMock.getSystemInfoSync.mockReturnValue({
      pixelWidth: 750,
      pixelHeight: 1334,
      pixelRatio: 2,
      safeArea: {
        top: 44
        // bottom, left, right are missing
      }
    })

    const { result } = mountComposable(useLynxScreen)
    expect(result.safeArea.value).toEqual({
      top: 44,
      bottom: 0,
      left: 0,
      right: 0
    })

    // Test case 2: all missing but object exists
    lynxMock.getSystemInfoSync.mockReturnValue({
      pixelWidth: 750,
      pixelHeight: 1334,
      pixelRatio: 2,
      safeArea: {}
    })
    result.refresh()
    expect(result.safeArea.value).toEqual({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    })
  })

  it("handles environment without global event listeners", () => {
    vi.stubGlobal("lynx", {
      getSystemInfoSync: vi.fn(() => ({
        pixelWidth: 750,
        pixelHeight: 1334,
        pixelRatio: 2
      }))
      // addGlobalEventListener/removeGlobalEventListener are missing
    })

    // Should not throw
    const { wrapper } = mountComposable(useLynxScreen)
    wrapper.unmount()
    expect(true).toBe(true)
  })
})
