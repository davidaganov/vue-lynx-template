<script setup lang="ts">
import { useI18n } from "@/i18n"

const { t } = useI18n()

const features = [
  { icon: "🌐", text: t("about.features.i18n") },
  { icon: "🎨", text: t("about.features.tailwindUtilityFirst") },
  { icon: "🧪", text: t("about.features.tests") }
]
</script>

<template>
  <view class="w-full max-w-[320px] flex flex-col gap-3">
    <view
      v-for="feature in features"
      class="rounded-xl border border-white/5 bg-white/[0.03] p-4 flex flex-row items-center gap-3"
      :key="feature.text"
    >
      <text class="text-xl">{{ feature.icon }}</text>
      <text
        class="text-sm text-gray-300 font-medium"
        text-selection="true"
        :flatten="false"
      >
        {{ feature.text }}
      </text>
    </view>
  </view>
</template>
