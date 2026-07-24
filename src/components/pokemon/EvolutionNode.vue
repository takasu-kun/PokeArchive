<script setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { idFromUrl, officialArtworkUrl } from '@/api/client'
import { humanize } from '@/composables/useLocalized'

const props = defineProps(['link'])

const speciesId = computed(() => idFromUrl(props.link.species.url))

function describeEvolution(d) {
  if (d.item) return `Use ${humanize(d.item.name)}`
  if (d.min_level) return `Level ${d.min_level}`
  if (d.min_happiness) return `Friendship ${d.min_happiness}+`
  if (d.min_beauty) return `Beauty ${d.min_beauty}+`
  if (d.min_affection) return `Affection ${d.min_affection}+`
  if (d.trigger?.name === 'trade') return d.trade_species ? `Trade for ${humanize(d.trade_species.name)}` : 'Trade'
  if (d.known_move) return `Know ${humanize(d.known_move.name)}`
  if (d.location) return `At ${humanize(d.location.name)}`
  if (d.time_of_day) return `During the ${d.time_of_day}`
  if (d.trigger?.name === 'level-up') return 'Level up'
  return d.trigger?.name ? humanize(d.trigger.name) : 'Unknown trigger'
}
</script>

<template>
  <div class="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
    <RouterLink :to="`/pokemon/${link.species.name}`" class="flex flex-col items-center gap-1 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-poke-red/40 dark:border-slate-700 dark:bg-surface-dark-raised">
      <img :src="officialArtworkUrl(speciesId)" :alt="link.species.name" class="h-24 w-24 object-contain" loading="lazy" />
      <span class="font-display text-sm font-semibold capitalize text-slate-700 dark:text-white">{{ humanize(link.species.name) }}</span>
    </RouterLink>

    <div v-if="link.evolves_to.length" class="flex flex-col gap-4 sm:ml-2 sm:mt-6">
      <div v-for="child in link.evolves_to" :key="child.species.name" class="flex items-center gap-3 sm:items-start">
        <div class="flex flex-col items-center gap-1 text-poke-red/70">
          <Icon icon="mdi:arrow-right-thin" class="hidden h-6 w-6 sm:block" />
          <Icon icon="mdi:arrow-down-thin" class="block h-6 w-6 sm:hidden" />
          <span class="max-w-[6rem] text-center text-[11px] font-medium leading-tight text-slate-500 dark:text-slate-400">
            {{ describeEvolution(child.evolution_details[0]) }}
          </span>
        </div>
        <EvolutionNode :link="child" />
      </div>
    </div>
  </div>
</template>
