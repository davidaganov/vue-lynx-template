<script setup lang="ts">
// @webstack:about-info-setup
const features = [
  { icon: "🌐", text: /* @webstack:about-feat-i18n */ "i18n Support" },
  { icon: "📦", text: /* @webstack:about-feat-pinia */ "Pinia Support" },
  { icon: "🎨", text: /* @webstack:about-feat-tailwind */ "Tailwind Support" },
  { icon: "🧪", text: /* @webstack:about-feat-tests */ "Unit Tests (Vitest)" }
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
