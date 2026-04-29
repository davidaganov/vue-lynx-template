<script setup lang="ts">
import { useAppStore } from "@/stores/app"
import { useLynxScreen } from "@/composables/useLynxScreen"

const appStore = useAppStore()

const { md } = useLynxScreen()
</script>

<template>
  <view>
    <view class="mb-6 rounded-full mx-auto bg-primary/10 px-4 py-1 border border-primary/20">
      <text
        class="text-xs font-semibold text-primary uppercase tracking-widest"
        text-selection="true"
        :flatten="false"
      >
        {{ $t("home.badge", { version: appStore.version }) }}
      </text>
    </view>

    <view class="mx-auto mb-3 flex flex-col font-bold tracking-tighter justify-center items-center">
      <text
        class="text-white leading-[1.1]"
        text-selection="true"
        :class="md ? 'text-6xl' : 'text-4xl'"
        :flatten="false"
      >
        {{ $t("home.hero.title") }}
      </text>
      <text
        class="text-primary leading-[1.1]"
        text-selection="true"
        :class="md ? 'text-6xl' : 'text-4xl'"
        :flatten="false"
      >
        {{ $t("home.hero.subtitle") }}
      </text>
    </view>

    <text
      class="mt-4 mx-auto text-gray-400 max-w-[65%] leading-relaxed"
      text-selection="true"
      :class="md ? 'text-xl' : 'text-lg'"
      :flatten="false"
    >
      {{ $t("home.hero.description") }}
    </text>
  </view>
</template>
