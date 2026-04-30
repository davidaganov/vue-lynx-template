<script setup lang="ts">
import { computed } from "vue-lynx"
import type { RouteLocationRaw } from "vue-router"
import { clsx } from "clsx"
import UiLink from "@/components/ui/UiLink.vue"

const props = withDefaults(
  defineProps<{
    type?: "primary" | "secondary" | "outline"
    disabled?: boolean
    loading?: boolean
    to?: RouteLocationRaw
  }>(),
  {
    type: "primary",
    disabled: false,
    loading: false,
    to: undefined
  }
)

const emit = defineEmits<{
  (e: "click", event: any): void
}>()

const buttonClasses = computed(() =>
  clsx({
    "bg-primary shadow-[0_0_20px_rgba(139,92,246,0.3)]": props.type === "primary",
    "bg-secondary border border-border": props.type === "secondary",
    "border border-primary/50 bg-primary/5": props.type === "outline",
    "opacity-50 cursor-not-allowed active:scale-100": props.disabled || props.loading
  })
)

const textClasses = computed(() =>
  clsx({
    "text-white": props.type === "primary" || props.type === "secondary",
    "text-primary": props.type === "outline"
  })
)

const handleClick = (e: any, navigate?: () => void) => {
  if (props.disabled || props.loading) return
  if (navigate) navigate()
  emit("click", e)
}
</script>

<template>
  <component
    v-slot="slotProps"
    class="flex"
    :is="props.to ? UiLink : 'view'"
    :to="props.to"
  >
    <view
      class="flex items-center justify-center w-full rounded-lg px-5 py-2.5 transition-all duration-300 cursor-pointer active:scale-95 hover:brightness-110"
      :class="buttonClasses"
      @tap="handleClick($event, slotProps?.navigate)"
    >
      <text
        v-if="!props.loading"
        class="text-sm font-medium tracking-wide"
        :class="textClasses"
      >
        <slot />
      </text>
      <text
        v-else
        class="text-sm font-medium text-white opacity-70"
      >
        Loading...
      </text>
    </view>
  </component>
</template>
