<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from "vue-router"

const props = defineProps<{
  to: RouteLocationRaw
}>()
</script>

<template>
  <RouterLink
    v-slot="{ navigate, isActive }"
    custom
    :to="props.to"
  >
    <view v-bind="$attrs">
      <slot
        :navigate="navigate"
        :is-active="isActive"
      />
    </view>
  </RouterLink>
</template>
