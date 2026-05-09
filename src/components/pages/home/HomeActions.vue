<script setup lang="ts">
import { useLynxScreen } from "@/composables/useLynxScreen"
import UiButton from "@/components/ui/UiButton.vue"

const { md } = useLynxScreen()

const handleGetStarted = () => {
  console.log("Get Started")
}
</script>

<template>
  <view
    class="home-actions"
    :class="md ? 'home-actions--row' : 'home-actions--col'"
  >
    <UiButton
      class="home-actions__btn"
      type="primary"
      @click="handleGetStarted"
    >
      {{ $t("home.actions.getStarted") }}
    </UiButton>
    <UiButton
      class="home-actions__btn"
      type="outline"
      :to="{ name: 'about' }"
    >
      {{ $t("home.actions.readMore") }}
    </UiButton>
  </view>
</template>

<style>
.home-actions {
  display: flex;
  width: 100%;
}
.home-actions--col {
  flex-direction: column;
  gap: 8px;
  margin-top: 32px;
  max-width: 180px;
}
.home-actions--row {
  flex-direction: row;
  gap: 16px;
  margin-top: 48px;
  max-width: 340px;
}
.home-actions__btn {
  width: 100%;
}
</style>
