<script setup lang="ts">
// @webstack:hero-imports
// @webstack:hero-setup
import { useLynxScreen } from "@/composables/useLynxScreen"

const { md } = useLynxScreen()
</script>

<template>
  <view class="hero">
    <view class="hero__badge">
      <text
        class="hero__badge-text"
        text-selection="true"
        :flatten="false"
      >
        <!-- @webstack:hero-badge -->
        v1.0.0
      </text>
    </view>

    <view class="hero__titles">
      <text
        class="hero__title hero__title--main"
        text-selection="true"
        :class="md ? 'hero__title--xl' : 'hero__title--lg'"
        :flatten="false"
      >
        <!-- @webstack:hero-title -->
        Lynx
      </text>
      <text
        class="hero__title hero__title--accent"
        text-selection="true"
        :class="md ? 'hero__title--xl' : 'hero__title--lg'"
        :flatten="false"
      >
        <!-- @webstack:hero-subtitle -->
        Starter Template
      </text>
    </view>

    <text
      class="hero__desc"
      text-selection="true"
      :class="md ? 'hero__desc--md' : 'hero__desc--sm'"
      :flatten="false"
    >
      <!-- @webstack:hero-description -->
      A simple template for quickly building mobile applications with Vue Lynx.
    </text>
  </view>
</template>

<style>
.hero {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.hero__badge {
  margin-bottom: 24px;
  align-self: center;
  padding: 4px 16px;
  border-radius: 9999px;
  background-color: rgba(139, 92, 246, 0.1);
  border-width: 1px;
  border-style: solid;
  border-color: rgba(139, 92, 246, 0.2);
}
.hero__badge-text {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-primary);
  letter-spacing: 0.2em;
}
.hero__titles {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  font-weight: 700;
  letter-spacing: -0.04em;
}
.hero__title {
  line-height: 1.1;
  text-align: center;
}
.hero__title--main {
  color: #ffffff;
}
.hero__title--accent {
  color: var(--color-primary);
}
.hero__title--lg {
  font-size: 36px;
}
.hero__title--xl {
  font-size: 60px;
}
.hero__desc {
  margin-top: 16px;
  margin-left: auto;
  margin-right: auto;
  max-width: 65%;
  line-height: 1.625;
  text-align: center;
  color: var(--color-text-muted);
}
.hero__desc--sm {
  font-size: 18px;
}
.hero__desc--md {
  font-size: 20px;
}
</style>
