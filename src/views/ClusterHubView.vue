<script setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { getClusterMeta, getEntriesForCluster } from '@/registry'
import CategoryHeader from '@/components/common/CategoryHeader.vue'
import { resolveColorToken } from '@/utils/typeColors'

const props = defineProps(['cluster'])

const meta = computed(() => getClusterMeta(props.cluster))
const entries = computed(() => getEntriesForCluster(props.cluster))
</script>

<template>
  <section v-if="meta" class="mx-auto max-w-6xl px-4 py-10 sm:px-6">
    <CategoryHeader :icon="meta.icon" :color="meta.color" :title="meta.label" :description="meta.description" />
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <RouterLink
        v-for="entry in entries"
        :key="entry.key"
        :to="`/${cluster}/${entry.key}`"
        class="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-poke-red/40 hover:shadow-md dark:border-slate-700 dark:bg-surface-dark-raised"
      >
        <div
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          :style="{ backgroundColor: `color-mix(in srgb, ${resolveColorToken(entry.color)} 18%, transparent)` }"
        >
          <Icon :icon="entry.icon" class="h-5.5 w-5.5" :style="{ color: resolveColorToken(entry.color) }" />
        </div>
        <div class="min-w-0">
          <p class="font-display font-semibold text-slate-800 group-hover:text-poke-red dark:text-white">{{ entry.pluralLabel }}</p>
          <p class="mt-0.5 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{{ entry.description }}</p>
        </div>
      </RouterLink>
    </div>
  </section>
</template>
