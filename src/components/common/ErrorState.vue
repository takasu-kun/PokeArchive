<script setup>
import { Icon } from '@iconify/vue'

defineProps({ message: { default: 'Something went wrong while talking to PokeAPI.' } })
const emit = defineEmits(['retry'])
</script>

<template>
  <div class="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-poke-red/40 bg-poke-red/5 px-6 py-12 text-center dark:bg-poke-red/10">
    <Icon icon="mdi:pokeball" class="h-10 w-10 text-poke-red/60" />
    <p class="font-display text-lg font-semibold text-slate-700 dark:text-slate-200">Oh no, it fainted!</p>
    <p class="max-w-sm text-sm text-slate-500 dark:text-slate-400">{{ message }}</p>
    <button
      type="button"
      class="mt-2 rounded-full bg-poke-red px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-poke-red-dark"
      @click="emit('retry')"
    >
      Try Again
    </button>
  </div>
</template>
