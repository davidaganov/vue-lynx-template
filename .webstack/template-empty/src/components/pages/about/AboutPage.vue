<script setup lang="ts">
import AboutInfo from "@/components/pages/about/AboutInfo.vue"
import UiButton from "@/components/ui/UiButton.vue"
</script>

<template>
  <view class="flex flex-col items-center justify-center min-h-[80vh] px-8 text-center">
    <view class="mb-4 flex flex-col items-center gap-2">
      <text
        class="text-4xl font-bold text-white tracking-tighter"
        text-selection="true"
        :flatten="false"
      >
        <!-- @webstack:about-title -->
        About
      </text>
    </view>

    <text
      class="text-base text-gray-400 max-w-[280px] leading-relaxed mb-8"
      text-selection="true"
      :flatten="false"
    >
      <!-- @webstack:about-description -->
      This template is a starting point for your Vue Lynx project.
    </text>

    <AboutInfo />

    <UiButton
      type="outline"
      class="mt-12 w-full max-w-[320px]"
      :to="{ name: 'home' }"
    >
      <!-- @webstack:about-return-button -->
      ← Return
    </UiButton>
  </view>
</template>
