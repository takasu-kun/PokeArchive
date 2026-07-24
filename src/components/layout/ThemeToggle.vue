<script setup>
import { Icon } from '@iconify/vue'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
</script>

<template>
  <button
    type="button"
    class="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-poke-red hover:text-poke-red dark:border-slate-700 dark:bg-surface-dark-raised dark:text-slate-300"
    :aria-label="ui.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="ui.toggleTheme()"
  >
    <Icon :icon="ui.theme === 'dark' ? 'mdi:weather-sunny' : 'mdi:weather-night'" class="h-5 w-5" />
  </button>
</template>
