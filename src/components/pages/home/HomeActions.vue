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
    class="flex w-full"
    :class="md ? 'gap-4 flex-row mt-12 max-w-[340px]' : 'gap-2 flex-col mt-8 max-w-[180px]'"
  >
    <UiButton
      class="w-full"
      type="primary"
      @click="handleGetStarted"
    >
      {{ $t("home.actions.getStarted") }}
    </UiButton>
    <UiButton
      class="w-full"
      type="outline"
      :to="{ name: 'about' }"
    >
      {{ $t("home.actions.readMore") }}
    </UiButton>
  </view>
</template>
