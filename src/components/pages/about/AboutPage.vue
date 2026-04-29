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
        {{ $t("about.title") }}
      </text>
    </view>

    <text
      class="text-base text-gray-400 max-w-[280px] leading-relaxed mb-8"
      text-selection="true"
      :flatten="false"
    >
      {{ $t("about.description") }}
    </text>

    <AboutInfo />

    <UiButton
      type="outline"
      class="h-12 mt-12 w-full max-w-[200px] rounded-full border-white/10 hover:border-primary/50"
      :to="{ name: 'home' }"
    >
      {{ $t("about.returnButton") }}
    </UiButton>
  </view>
</template>
