import { ref, computed, onMounted, onUnmounted, readonly } from "vue"

/**
 * Local interface for Lynx runtime methods that might be missing from
 * the official @lynx-js/types but are present in the actual environment.
 */
interface LynxBackgroundRuntime {
  getSystemInfoSync(): {
    pixelWidth: number
    pixelHeight: number
    pixelRatio: number
    platform: string
    safeArea?: {
      top: number
      bottom: number
      left: number
      right: number
    }
  }
  addGlobalEventListener(event: string, listener: (...args: any[]) => void): void
  removeGlobalEventListener(event: string, listener: (...args: any[]) => void): void
}

/**
 * Breakpoints in logical pixels (dp/pt).
 * Matches Tailwind CSS defaults.
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536
} as const

/**
 * Reactive Lynx screen and system information composable.
 * Uses a safe combination of global SystemInfo and background thread APIs.
 */
export const useLynxScreen = () => {
  const width = ref(0)
  const height = ref(0)
  const safeAreaInsets = ref({ top: 0, bottom: 0, left: 0, right: 0 })

  // Cast lynx to our local interface for type safety without global pollution
  const runtime = lynx as unknown as LynxBackgroundRuntime

  /**
   * Updates reactive dimensions by converting physical pixels to logical pixels.
   */
  const update = () => {
    try {
      // Prefer getSystemInfoSync for complete data including safeArea
      const info = runtime.getSystemInfoSync()
      const ratio = info.pixelRatio || 1

      width.value = info.pixelWidth / ratio
      height.value = info.pixelHeight / ratio

      if (info.safeArea) {
        safeAreaInsets.value = {
          top: info.safeArea.top || 0,
          bottom: info.safeArea.bottom || 0,
          left: info.safeArea.left || 0,
          right: info.safeArea.right || 0
        }
      }
    } catch (e) {
      const ratio = SystemInfo.pixelRatio || 1
      width.value = SystemInfo.pixelWidth / ratio
      height.value = SystemInfo.pixelHeight / ratio
    }
  }

  onMounted(() => {
    update()
    if (typeof runtime.addGlobalEventListener === "function") {
      runtime.addGlobalEventListener("windowresize", update)
    }
  })

  onUnmounted(() => {
    if (typeof runtime.removeGlobalEventListener === "function") {
      runtime.removeGlobalEventListener("windowresize", update)
    }
  })

  return {
    /** Screen width in logical pixels */
    width: readonly(width),
    /** Screen height in logical pixels */
    height: readonly(height),
    /** Device pixel ratio */
    pixelRatio: computed(() => SystemInfo.pixelRatio),

    /** Platform identification */
    platform: computed(() => SystemInfo.platform.toLowerCase()),
    isAndroid: computed(() => SystemInfo.platform.toLowerCase().includes("android")),
    isIOS: computed(() => SystemInfo.platform.toLowerCase().includes("ios")),

    /** Safe area insets (top, bottom, left, right) */
    safeArea: readonly(safeAreaInsets),

    /** Orientation flags */
    isPortrait: computed(() => height.value >= width.value),
    isLandscape: computed(() => width.value > height.value),

    /** Tailwind-like breakpoints */
    sm: computed(() => width.value >= BREAKPOINTS.sm),
    md: computed(() => width.value >= BREAKPOINTS.md),
    lg: computed(() => width.value >= BREAKPOINTS.lg),
    xl: computed(() => width.value >= BREAKPOINTS.xl),
    xxl: computed(() => width.value >= BREAKPOINTS["2xl"]),

    /** Manually trigger a metrics update */
    refresh: update
  }
}

export type UseLynxScreenReturn = ReturnType<typeof useLynxScreen>
