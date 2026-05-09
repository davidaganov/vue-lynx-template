<script setup lang="ts">
import UiLanguageSwitcher from "@/components/ui/UiLanguageSwitcher.vue"
</script>

<template>
  <scroll-view
    scroll-y="true"
    class="layout"
  >
    <view class="layout__top">
      <UiLanguageSwitcher />
    </view>

    <view class="layout__main">
      <RouterView />
    </view>

    <view class="layout__glow layout__glow--left" />
    <view class="layout__glow layout__glow--right" />
  </scroll-view>
</template>

<style>
.layout {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  background-color: var(--color-background);
  position: relative;
}
.layout__top {
  position: absolute;
  top: 32px;
  padding-top: 16px;
  right: 24px;
  z-index: 50;
}
.layout__main {
  flex: 1;
  z-index: 20;
  display: flex;
  justify-content: center;
  min-height: 100%;
  flex-direction: column;
  height: 100%;
  padding: 20px;
}
.layout__glow {
  position: absolute;
  z-index: 10;
  pointer-events: none;
  border-radius: 9999px;
  background-color: var(--color-glow);
}
.layout__glow--left {
  bottom: 40px;
  left: -80px;
  width: 256px;
  height: 256px;
  filter: blur(100px);
}
.layout__glow--right {
  bottom: 80px;
  right: -80px;
  width: 320px;
  height: 320px;
  filter: blur(80px);
}
</style>

<style>
scroll-view {
  height: 100vh;
}
</style>
