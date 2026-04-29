import { ref } from "vue"
import { defineStore } from "pinia"

export const useAppStore = defineStore("app", () => {
  const version = ref("1.0.0")
  const isInitialized = ref(false)

  const setInitialized = (value: boolean) => {
    isInitialized.value = value
  }

  return {
    version,
    isInitialized,
    setInitialized
  }
})
