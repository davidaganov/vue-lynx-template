<script setup lang="ts">
import UiLanguageSwitcher from "@/components/ui/UiLanguageSwitcher.vue"
</script>

<template>
  <scroll-view
    scroll-y="true"
    class="flex min-h-screen flex-col bg-background relative"
  >
    <!-- Top Bar with Language Switcher -->
    <view class="absolute top-8 pt-4 right-6 z-50">
      <UiLanguageSwitcher />
    </view>

    <view class="flex-1 z-20 flex justify-center min-h-screen flex-col h-full p-5">
      <RouterView />
    </view>

    <!-- Background Glow -->
    <view
      class="absolute z-10 pointer-events-none bottom-10 -left-20 w-64 h-64 bg-violet-600/10 rounded-full blur-[100px]"
    />
    <view
      class="absolute z-10 pointer-events-none bottom-20 -right-20 w-80 h-80 bg-violet-600/10 rounded-full blur-[80px]"
    />
  </scroll-view>
</template>

<style>
scroll-view {
  height: 100vh;
}
</style>
