<script setup lang="ts">
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

    <!-- Quick Info -->
    <view class="w-full max-w-[320px] flex flex-col gap-3">
      <view
        class="rounded-xl border border-white/5 bg-white/[0.03] p-4 flex flex-row items-center gap-3"
      >
        <text class="text-xl">🌐</text>
        <text
          class="text-sm text-gray-300 font-medium"
          text-selection="true"
          :flatten="false"
        >
          {{ $t("about.features.i18n") }}
        </text>
      </view>

      <view
        class="rounded-xl border border-white/5 bg-white/[0.03] p-4 flex flex-row items-center gap-3"
      >
        <text class="text-xl">🎨</text>
        <text
          class="text-sm text-gray-300 font-medium"
          text-selection="true"
          :flatten="false"
        >
          {{ $t("about.features.tailwindUtilityFirst") }}
        </text>
      </view>
    </view>

    <UiButton
      type="outline"
      class="h-12 mt-12 w-full max-w-[200px] rounded-full border-white/10 hover:border-primary/50"
      :to="{ name: 'home' }"
    >
      {{ $t("about.returnButton") }}
    </UiButton>
  </view>
</template>
