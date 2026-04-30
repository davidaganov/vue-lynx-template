<script setup lang="ts">
import { computed } from "vue-lynx"
import { clsx } from "clsx"
import { useI18n, LOCALES } from "@/i18n"

const { locale, setLocale } = useI18n()

const availableLocales = computed(() => Object.values(LOCALES))

const switchLocale = (newLocale: LOCALES) => {
  setLocale(newLocale)
}
</script>

<template>
  <view
    class="flex flex-row items-center bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur-md"
  >
    <view
      v-for="l in availableLocales"
      class="px-3 py-1 rounded-full transition-all duration-300 cursor-pointer"
      :key="l"
      :class="
        clsx({
          'bg-transparent border border-transparent opacity-60 hover:opacity-100': locale !== l,
          'bg-primary/20 border border-primary/30': locale === l
        })
      "
      @tap="switchLocale(l)"
    >
      <text
        class="text-xs font-semibold tracking-wider"
        :class="locale === l ? 'text-primary' : 'text-gray-400'"
      >
        {{ l }}
      </text>
    </view>
  </view>
</template>
