<script setup lang="ts">
import AboutInfo from "@/components/pages/about/AboutInfo.vue"
import UiButton from "@/components/ui/UiButton.vue"
</script>

<template>
  <view class="about-page">
    <view class="about-page__header">
      <text
        class="about-page__title"
        text-selection="true"
        :flatten="false"
      >
        {{ $t("about.title") }}
      </text>
    </view>

    <text
      class="about-page__description"
      text-selection="true"
      :flatten="false"
    >
      {{ $t("about.description") }}
    </text>

    <AboutInfo />

    <UiButton
      type="outline"
      class="about-page__back"
      :to="{ name: 'home' }"
    >
      {{ $t("about.returnButton") }}
    </UiButton>
  </view>
</template>

<style>
.about-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding-left: 32px;
  padding-right: 32px;
  text-align: center;
}
.about-page__header {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.about-page__title {
  font-size: 36px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.04em;
}
.about-page__description {
  font-size: 16px;
  color: var(--color-text-muted);
  max-width: 280px;
  line-height: 1.625;
  margin-bottom: 32px;
}
.about-page__back {
  margin-top: 48px;
  width: 100%;
  max-width: 320px;
}
</style>
