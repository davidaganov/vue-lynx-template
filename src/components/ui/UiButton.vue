<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router"
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

const handleClick = (e: any, navigate?: () => void) => {
  if (props.disabled || props.loading) return
  if (navigate) navigate()
  emit("click", e)
}
</script>

<template>
  <component
    v-slot="slotProps"
    class="ui-button-root"
    :is="props.to ? UiLink : 'view'"
    :to="props.to"
  >
    <view
      class="ui-button__inner"
      :class="[
        props.type === 'primary' ? 'ui-button__inner--primary' : '',
        props.type === 'secondary' ? 'ui-button__inner--secondary' : '',
        props.type === 'outline' ? 'ui-button__inner--outline' : '',
        props.disabled || props.loading ? 'ui-button__inner--blocked' : ''
      ]"
      @tap="handleClick($event, slotProps?.navigate)"
    >
      <text
        v-if="!props.loading"
        class="ui-button__label"
        :class="props.type === 'outline' ? 'ui-button__label--outline' : 'ui-button__label--on-solid'"
      >
        <slot />
      </text>
      <text
        v-else
        class="ui-button__label ui-button__label--on-solid ui-button__label--loading"
      >
        Loading...
      </text>
    </view>
  </component>
</template>

<style>
.ui-button-root {
  display: flex;
}
.ui-button__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 8px;
  padding: 10px 20px;
  transition: filter 0.3s ease, opacity 0.3s ease, transform 0.2s ease;
}
.ui-button__inner--primary {
  background-color: var(--color-primary);
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
}
.ui-button__inner--secondary {
  background-color: var(--color-secondary);
  border-width: 1px;
  border-style: solid;
  border-color: var(--color-border);
}
.ui-button__inner--outline {
  border-width: 1px;
  border-style: solid;
  border-color: rgba(139, 92, 246, 0.5);
  background-color: rgba(139, 92, 246, 0.05);
}
.ui-button__inner--blocked {
  opacity: 0.5;
  cursor: not-allowed;
}
.ui-button__inner:active:not(.ui-button__inner--blocked) {
  transform: scale(0.95);
}
.ui-button__label {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.05em;
}
.ui-button__label--on-solid {
  color: #ffffff;
}
.ui-button__label--outline {
  color: var(--color-primary);
}
.ui-button__label--loading {
  opacity: 0.7;
}
</style>
