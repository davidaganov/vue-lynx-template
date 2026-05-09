<script setup lang="ts">
import HomeActions from "@/components/pages/home/HomeActions.vue"
import HomeHero from "@/components/pages/home/HomeHero.vue"
</script>

<template>
  <view class="home-page">
    <HomeHero />
    <HomeActions />
  </view>
</template>

<style>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding-left: 24px;
  padding-right: 24px;
  text-align: center;
}
</style>
