<script setup lang="ts">
// @webstack:hero-imports
import { useLynxScreen } from "@/composables/useLynxScreen"

// @webstack:hero-setup
const { md } = useLynxScreen()
</script>

<template>
  <view>
    <view class="mb-6 rounded-full mx-auto bg-primary/10 px-4 py-1 border border-primary/20">
      <text
        class="text-xs font-semibold text-primary tracking-widest"
        text-selection="true"
        :flatten="false"
      >
        <!-- @webstack:hero-badge -->
        v1.0.0
      </text>
    </view>

    <view class="mx-auto mb-3 flex flex-col font-bold tracking-tighter justify-center items-center">
      <text
        class="text-white leading-[1.1]"
        text-selection="true"
        :class="md ? 'text-6xl' : 'text-4xl'"
        :flatten="false"
      >
        <!-- @webstack:hero-title -->
        Vue Lynx
      </text>
      <text
        class="text-primary leading-[1.1]"
        text-selection="true"
        :class="md ? 'text-6xl' : 'text-4xl'"
        :flatten="false"
      >
        <!-- @webstack:hero-subtitle -->
        Starter Template
      </text>
    </view>

    <text
      class="mt-4 mx-auto text-gray-400 max-w-[65%] leading-relaxed"
      text-selection="true"
      :class="md ? 'text-xl' : 'text-lg'"
      :flatten="false"
    >
      <!-- @webstack:hero-description -->
      A simple template for quickly building mobile applications with Vue Lynx.
    </text>
  </view>
</template>
