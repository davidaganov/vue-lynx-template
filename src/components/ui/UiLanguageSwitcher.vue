<script setup lang="ts">
import { computed } from "vue-lynx"
import { useI18n, LOCALES } from "@/i18n"

const { locale, setLocale } = useI18n()

const availableLocales = computed(() => Object.values(LOCALES))

const switchLocale = (newLocale: LOCALES) => {
  setLocale(newLocale)
}
</script>

<template>
  <view class="lang-switcher">
    <view
      v-for="l in availableLocales"
      class="lang-switcher__item"
      :class="locale === l ? 'lang-switcher__item--active' : 'lang-switcher__item--idle'"
      :key="l"
      @tap="switchLocale(l)"
    >
      <text
        class="lang-switcher__text"
        :class="locale === l ? 'lang-switcher__text--active' : 'lang-switcher__text--idle'"
      >
        {{ l }}
      </text>
    </view>
  </view>
</template>

<style>
.lang-switcher {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.05);
  border-width: 1px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.1);
}
.lang-switcher__item {
  padding: 4px 12px;
  border-radius: 9999px;
  transition: opacity 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
}
.lang-switcher__item--idle {
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  background-color: transparent;
  opacity: 0.6;
}
.lang-switcher__item--active {
  border-width: 1px;
  border-style: solid;
  border-color: rgba(139, 92, 246, 0.3);
  background-color: rgba(139, 92, 246, 0.2);
  opacity: 1;
}
.lang-switcher__text {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
}
.lang-switcher__text--active {
  color: var(--color-primary);
}
.lang-switcher__text--idle {
  color: var(--color-text-muted);
}
</style>
