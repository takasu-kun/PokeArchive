<script setup>
defineProps({ rows: { default: 6 }, variant: { default: 'card' } })
</script>

<template>
  <div v-if="variant === 'card'" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading">
    <div
      v-for="i in rows"
      :key="i"
      class="h-28 animate-pulse rounded-2xl bg-slate-200/70 dark:bg-slate-800/70"
    />
  </div>
  <div v-else class="space-y-3" aria-busy="true" aria-label="Loading">
    <div v-for="i in rows" :key="i" class="h-4 w-full animate-pulse rounded bg-slate-200/70 dark:bg-slate-800/70" />
  </div>
</template>
