<script setup lang="ts">
import HomeActions from "@/components/pages/home/HomeActions.vue"
import HomeHero from "@/components/pages/home/HomeHero.vue"
</script>

<template>
  <view class="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
    <HomeHero />
    <HomeActions />
  </view>
</template>
