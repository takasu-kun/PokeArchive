<script setup>
import { Icon } from '@iconify/vue'
import { CLUSTERS } from '@/registry/clusters'
import { resolveColorToken } from '@/utils/typeColors'
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <h2 class="mb-6 font-display text-2xl font-bold text-slate-800 dark:text-white">Explore Every Corner of the Archive</h2>
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <RouterLink
        v-for="cluster in CLUSTERS"
        :key="cluster.key"
        :to="cluster.key === 'pokemon' ? '/pokemon' : `/${cluster.key}`"
        class="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-poke-red/40 hover:shadow-md dark:border-slate-700 dark:bg-surface-dark-raised"
      >
        <div
          class="flex h-12 w-12 items-center justify-center rounded-2xl transition group-hover:scale-110"
          :style="{ backgroundColor: `color-mix(in srgb, ${resolveColorToken(cluster.color)} 18%, transparent)` }"
        >
          <Icon :icon="cluster.icon" class="h-6 w-6" :style="{ color: resolveColorToken(cluster.color) }" />
        </div>
        <span class="font-display text-sm font-semibold text-slate-700 dark:text-white">{{ cluster.label }}</span>
      </RouterLink>
    </div>
  </section>
</template>
