<script setup>
import { Icon } from '@iconify/vue'

defineProps(['page', 'pageCount', 'hasNext', 'hasPrev'])

const emit = defineEmits(['prev', 'next'])
</script>

<template>
  <div class="flex items-center justify-center gap-4 py-8">
    <button
      type="button"
      :disabled="!hasPrev"
      class="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:border-poke-red hover:text-poke-red disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-inherit dark:border-slate-700 dark:bg-surface-dark-raised"
      @click="emit('prev')"
    >
      <Icon icon="mdi:chevron-left" class="h-4 w-4" />
      Prev
    </button>
    <span class="text-sm font-medium text-slate-500 dark:text-slate-400">Page {{ page }} of {{ pageCount }}</span>
    <button
      type="button"
      :disabled="!hasNext"
      class="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:border-poke-red hover:text-poke-red disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-inherit dark:border-slate-700 dark:bg-surface-dark-raised"
      @click="emit('next')"
    >
      Next
      <Icon icon="mdi:chevron-right" class="h-4 w-4" />
    </button>
  </div>
</template>
