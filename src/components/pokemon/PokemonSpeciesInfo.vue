<script setup>
import { computed } from 'vue'
import CrossLink from '@/components/common/CrossLink.vue'
import { localizedText } from '@/composables/useLocalized'
import { resolveColorToken } from '@/utils/typeColors'

const props = defineProps(['species'])

const flavorText = computed(() => localizedText(props.species.flavor_text_entries))
const genus = computed(() => localizedText(props.species.genera))

const badges = computed(() =>
  [
    props.species.is_legendary && { label: 'Legendary', color: 'poke-gold' },
    props.species.is_mythical && { label: 'Mythical', color: 'type-fairy' },
    props.species.is_baby && { label: 'Baby', color: 'poke-blue' },
  ].filter(Boolean),
)
</script>

<template>
  <div class="space-y-4">
    <div v-if="badges.length" class="flex flex-wrap gap-2">
      <span
        v-for="b in badges"
        :key="b.label"
        class="rounded-full px-3 py-1 text-xs font-semibold text-white"
        :style="{ backgroundColor: resolveColorToken(b.color) }"
      >
        {{ b.label }}
      </span>
    </div>

    <p v-if="genus" class="text-sm font-medium text-slate-500 dark:text-slate-400">{{ genus }}</p>
    <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{{ flavorText || 'No flavor text available.' }}</p>

    <dl class="grid grid-cols-2 gap-4 sm:grid-cols-3">
      <div>
        <dt class="text-xs uppercase tracking-wide text-slate-400">Color</dt>
        <dd class="mt-1"><CrossLink :resource="species.color" /></dd>
      </div>
      <div v-if="species.shape">
        <dt class="text-xs uppercase tracking-wide text-slate-400">Shape</dt>
        <dd class="mt-1"><CrossLink :resource="species.shape" /></dd>
      </div>
      <div v-if="species.habitat">
        <dt class="text-xs uppercase tracking-wide text-slate-400">Habitat</dt>
        <dd class="mt-1"><CrossLink :resource="species.habitat" /></dd>
      </div>
      <div>
        <dt class="text-xs uppercase tracking-wide text-slate-400">Growth Rate</dt>
        <dd class="mt-1"><CrossLink :resource="species.growth_rate" /></dd>
      </div>
      <div>
        <dt class="text-xs uppercase tracking-wide text-slate-400">Egg Groups</dt>
        <dd class="mt-1 flex flex-wrap gap-1.5"><CrossLink v-for="g in species.egg_groups" :key="g.name" :resource="g" /></dd>
      </div>
      <div>
        <dt class="text-xs uppercase tracking-wide text-slate-400">Capture Rate</dt>
        <dd class="mt-1 font-semibold text-slate-700 dark:text-slate-200">{{ species.capture_rate }}</dd>
      </div>
      <div>
        <dt class="text-xs uppercase tracking-wide text-slate-400">Base Happiness</dt>
        <dd class="mt-1 font-semibold text-slate-700 dark:text-slate-200">{{ species.base_happiness }}</dd>
      </div>
      <div>
        <dt class="text-xs uppercase tracking-wide text-slate-400">Hatch Steps</dt>
        <dd class="mt-1 font-semibold text-slate-700 dark:text-slate-200">{{ species.hatch_counter * 255 }}</dd>
      </div>
      <div v-if="species.evolves_from_species">
        <dt class="text-xs uppercase tracking-wide text-slate-400">Evolves From</dt>
        <dd class="mt-1"><CrossLink :resource="species.evolves_from_species" /></dd>
      </div>
    </dl>
  </div>
</template>
