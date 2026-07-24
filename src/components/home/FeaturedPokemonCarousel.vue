<script setup>
import { onMounted, ref } from 'vue'
import { fetchResource, officialArtworkUrl } from '@/api/client'
import { typeColor } from '@/utils/typeColors'
import { humanize } from '@/composables/useLocalized'

const FEATURED_IDS = [25, 6, 94, 150, 658, 448, 133, 887, 282, 445, 39, 249]

const featured = ref([])

onMounted(async () => {
  const results = await Promise.allSettled(FEATURED_IDS.map((id) => fetchResource('pokemon', id)))
  featured.value = results.filter((r) => r.status === 'fulfilled').map((r) => r.value)
})
</script>

<template>
  <section class="overflow-hidden py-12">
    <h2 class="mx-auto mb-6 max-w-6xl px-4 font-display text-2xl font-bold text-slate-800 dark:text-white sm:px-6">Fan Favorites</h2>
    <div v-if="featured.length" class="group relative">
      <div class="flex w-max animate-marquee gap-4 px-4 group-hover:[animation-play-state:paused] sm:px-6">
        <RouterLink
          v-for="(p, i) in [...featured, ...featured]"
          :key="`${p.id}-${i}`"
          :to="`/pokemon/${p.name}`"
          class="flex w-40 shrink-0 flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-surface-dark-raised"
          :style="{ borderTopColor: typeColor(p.types[0]?.type.name), borderTopWidth: '3px' }"
        >
          <img :src="officialArtworkUrl(p.id)" :alt="p.name" class="h-20 w-20 object-contain" loading="lazy" />
          <span class="truncate text-sm font-semibold capitalize text-slate-700 dark:text-white">{{ humanize(p.name) }}</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
.animate-marquee {
  animation: marquee 40s linear infinite;
}
</style>
