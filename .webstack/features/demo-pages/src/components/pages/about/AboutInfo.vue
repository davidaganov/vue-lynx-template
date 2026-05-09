<script setup lang="ts">
// @webstack:about-info-setup
const features = [
  { icon: "🌐", text: /* @webstack:about-feat-i18n */ "i18n Support" },
  { icon: "📦", text: /* @webstack:about-feat-pinia */ "Pinia Support" },
  // @webstack:about-feat-tailwind-slot
  { icon: "🧪", text: /* @webstack:about-feat-tests */ "Unit Tests (Vitest)" }
]
</script>

<template>
  <view class="about-info">
    <view
      v-for="(feature, index) in features"
      class="about-info__row"
      :key="index"
    >
      <text class="about-info__icon">{{ feature.icon }}</text>
      <text
        class="about-info__label"
        text-selection="true"
        :flatten="false"
      >
        {{ feature.text }}
      </text>
    </view>
  </view>
</template>

<style>
.about-info {
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.about-info__row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  border-width: 1px;
  border-style: solid;
  border-color: var(--color-border-subtle);
  background-color: var(--color-surface-glass);
}
.about-info__icon {
  font-size: 20px;
}
.about-info__label {
  font-size: 14px;
  font-weight: 500;
  color: #d1d5db;
}
</style>
